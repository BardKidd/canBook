<template>
    <div class="container">
        <loading :active.sync="isLoading"></loading>
        <div class="row shopPaddingTop">
            <!-- sidebar -->
            <div class="classificationAndCart col-4">
                <div class="booksClassification">
                    <strong>書籍類別</strong>
                    <select class="classificationStyle" v-model="classification" @click.prevent="bookFilter">
                        <option value="全部好書" class="classificationStyle"><i class="fas fa-bookmark"></i>全部好書</option>
                        <option :value="item" class="classificationStyle" v-for="(item, key) in allCategoryFilter" :key="key"><i class="fas fa-bookmark"></i>{{ item }}</option>
                    </select>
                </div>
                <div class="shoppingCartList">
                    <div class="shoppingCartListTitle">
                        <strong>購物車清單</strong>
                        <button type="button" class="btn btn-outline-danger" @click.prevent="delAllShoppingCartList">清空購物車</button>
                        <div class="countRound">{{ totalShoppingList.carts.length }}</div>
                    </div>
                    <div class="lumpSum">
                        <strong>總額</strong>
                        <span>NT: {{ totalShoppingList.total }}</span>
                    </div>
                    <div class="lumpSum" v-if="totalShoppingList.total !== totalShoppingList.final_total">
                        <strong>折扣後</strong>
                        <span>NT: {{ Math.round(totalShoppingList.final_total) }}</span>
                    </div>
                    <div class="shoppingCartContent" v-for="(item, key) in totalShoppingList.carts" :key="key">
                        <button type="button" class="btn btn-outline-danger" @click.prevent="delShoppingCartList(item.id)"><i class="fas fa-trash-alt"></i></button>
                        <div>
                            <p>{{ item.product.title }}</p>
                            <p>{{ item.qty }} / {{ item.product.unit }}</p>
                        </div>
                        <span>NT: {{ item.product.price * item.qty }}</span>
                    </div>
                    <div class="enterCoupon">
                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                        <div class="input-group-append" @click.prevent="useCoupon">
                            <button class="btn" type="button" id="button-addon2">送出</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- content -->
            <div class="totalBooks col-8">
                <div class="totalBooksTitle">{{ classification }}</div>
                <div class="col-4 totalBooksCard" v-for="(item, key) in totalBooks" :key="key" id="aBook">
                    <div class="cardImg" @click.prevent="seeMore(item.id)">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="totalBooksCardFontStyle">
                        <strong>{{ item.title }}</strong>
                        <span>NT: {{ item.price }}</span>
                        <i class="fas fa-shopping-basket" @click.prevent="addToShopingCart(item.id)"></i>
                    </div>
                </div>
                <Pagination :pagination = pagination @emitPage = getShop v-if="classification === '全部好書'"></Pagination>
            </div>
        </div>
        <router-link to="/canbook/cart">
            <div class="shoppingCartIcon">
                <i class="fas fa-shopping-cart"></i>
                <div class="shoppingCartQty">{{ totalShoppingList.carts.length }}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
// import $ from 'jquery';
import Pagination from './Pagination';

export default {
    components: {
        Pagination
    },
    data() {
        return {
            totalBooks: [],
            pagination: {},
            isLoading: false,
            shopId: '',
            totalShoppingList: {
                carts: {},
            },
            coupon_code: '',
            classification: '全部好書',
            allCategory: [],
            allCategoryFilter: [],
        }
    },
    methods: {
        getShop(page = 1) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            // vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                vm.totalBooks = response.data.products;
                vm.pagination = response.data.pagination;
                // vm.isLoading = false;
            })
        },
        seeMore(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.shopId = id
            vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                if(response.data.success) {
                    vm.$router.push(`shop/${vm.shopId}`);
                }
                vm.isLoading = false;
            })
        },
        addToShopingCart(id, num = 1) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            const shopData = {
                product_id: id,
                qty: num
            }
            vm.isLoading = true;
            vm.$http.post(api, { data: shopData }).then((response) => {
                vm.ShoppingCartList();
                vm.isLoading = false;
                if(response.data.success) {
                    vm.$bus.$emit('message:push', response.data.message, 'success');
                }
            })
        },
        ShoppingCartList() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            vm.$http.get(api).then((response) => {
                vm.totalShoppingList = response.data.data;
                vm.totalShoppingList.carts = response.data.data.carts;
            })
        },
        delShoppingCartList(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            vm.$http.delete(api).then((response) => {
                vm.ShoppingCartList();
                vm.isLoading = false;
                if(response.data.success) {
                    vm.$bus.$emit('message:push', response.data.message, 'danger');
                }
            })
        },
        useCoupon() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
            const vm = this;
            const coupon = {
                code: vm.coupon_code,
            }
            vm.$http.post(api, { data: coupon }).then()
        },
        categoryShow() {
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            vm.$http.get(api).then((response) => {
                let allProduct = response.data.products;
                vm.allCategory = allProduct.map(function(item){
                    return item.category
                });
                vm.allCategoryFilter = vm.allCategory.filter(function(item, number, arr){
                    return arr.indexOf(item) == number;
                })
            })
        },
        bookFilter() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            const vm = this;
            vm.$http.get(api).then((response) => {
                let allProduct = response.data.products;
                if(vm.classification === '全部好書') {
                    vm.getShop();
                }
                else {
                    vm.totalBooks = allProduct.filter(function(item){
                        return vm.classification === item.category;
                    })
                }
            })
        },
        delAllShoppingCartList() {
            const vm = this;
            let getAllID = vm.totalShoppingList.carts;
            let itisID = [];
            vm.isLoading = true;
            getAllID.forEach(function(item){
                itisID.push(item.id);
            })
            let apiary = [];
            itisID.forEach(function(id){
                let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
                apiary.push(vm.$http.delete(api).then())
            })
            Promise.all(apiary).then(function() {
                vm.isLoading = false
                vm.ShoppingCartList();
                if(vm.isLoading == false) {
                    vm.$bus.$emit('message:push', '已全部刪除', 'danger');
                }
            })
        }
    },
    created() {
        this.getShop();
        this.ShoppingCartList();
        this.categoryShow();
    }
}
</script>
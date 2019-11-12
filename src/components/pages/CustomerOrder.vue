<template>
  <div>
      <loading :active.sync="isLoading"></loading>

      <!-- 卡片 -->
      <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="(item, key) in cardProducts" :key="key">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="item.price === item.origin_price">{{ item.origin_price }} 元</div>
                    <del class="h6" v-if="item.price !== item.origin_price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5" v-if="item.price !== item.origin_price">現在只要 {{ item.price }} 元</div>
                </div>
                </div>
                <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="seeMore(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === productId"></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === productId"></i>
                    加到購物車
                </button>
                </div>
            </div>
        </div>
      </div>

      <!-- 分頁 -->
      <Pagination :pagination = pagination @emitPage = getCustomerOrder></Pagination>
      
      <!-- 產品 -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="height: 100vh; background-size: cover; background-position: center" :style="{backgroundImage: `url(${ product.imageUrl })`}">
                </div>
                <p class="card-text">{{ product.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="product.price === product.origin_price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price !== product.origin_price">原價 {{ product.origin_price }} 元</del>
                    <div class="h5" v-if="product.price !== product.origin_price">現在只要 {{ product.price }} 元</div>
                </div>
                <select class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
                </select>
            </div>
            <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                    小計
                    <p>{{ product.num * product.price }}</p>
                </div>
                <button type="button" class="btn btn-primary">加入購物車</button>
            </div>
            </div>
        </div>
      </div>

      
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';
export default {
    components: {
        Pagination,
    },
    data() {
        return {
            pagination: {},
            isLoading: false,
            cardProducts: [],
            product: {},
            productId: '',
        }
    },
    methods: {
        getCustomerOrder(page = 2) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                vm.isLoading = false;
                vm.cardProducts = response.data.products;
                vm.pagination = response.data.pagination;
            })
        },
        seeMore(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.productId = id;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                if(response.data.success) {
                    vm.product = response.data.product;
                    response.data.product.num = 1;
                    $('#productModal').modal('show');
                    vm.productId = '';
                }
            })
        }
    },
    created() {
        this.getCustomerOrder();
    }
}
</script>
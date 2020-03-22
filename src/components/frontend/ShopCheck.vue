<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row shopPaddingTop shopPaddingBottom">
      <a class="backShop" @click.prevent="backPage">
        <i class="fas fa-backward"></i> 回到商品區
      </a>
    </div>

    <!-- 產品介紹 -->
    <div class="row shopCheckBox">
      <!-- 產品照片 -->
      <div class="col-5">
        <img :src="productData.imageUrl" alt />
      </div>

      <!-- 產品內容 -->
      <div class="col-7 productShop">
        <div class="productShopTitle">
          <span>{{ productData.category }}</span>
          <h2>{{ productData.title }}</h2>
        </div>
        <div class="productShopContent">
          <span>【內容簡介】</span>
          <p>{{ productData.description }}</p>
        </div>
        <div class="productShopPrice">
          <strong v-if="productData.price !== productData.origin_price">NT$: {{ productData.price }}</strong>
          <strong v-if="productData.price === productData.origin_price">NT$: {{ productData.origin_price }}</strong>
          <p v-if="productData.price !== productData.origin_price">NT$: {{ productData.origin_price }}</p>
        </div>
        <div class="productShopQuantity">
          <select v-model="productData.num">
            <option :value="num" v-for="num in 10" :key="num">購買 {{ num }} {{ productData.unit }}</option>
          </select>
          <p>
            總共:
            <strong>NT$ {{ productData.num * productData.price }} 元</strong>
          </p>
        </div>
        <div class="productShopAdd">
          <div class="input-group-append" @click.prevent="addToShopCart(shopId, productData.num)">
            <button class="btn" type="button">加入購物車</button>
          </div>
        </div>
      </div>

      <!-- 購物車 -->
      <div class="shoppingSideBar" v-if="shopCartList.carts.length > 0">
        <div class="shoppingSideBarTitle">
          <span>購物車內容</span>
          <i class="fas fa-times" @click="sideBarClose"></i>
        </div>
        <div class="shoppingSideBarContent">
          <div v-for="(item, key) in shopCartList.carts" :key="key" class="shoppingSideBarList">
            <span class="shoppingSideBarDataDel" @click.prevent="delShopingCartList(item.id)">X</span>
            <img :src="item.product.imageUrl" alt="">
            <div class="shoppingSideBarData">
              <p>{{ item.product.title }}</p>
              <span>{{ item.qty }}/{{item.product.unit}}</span>
              <span>NT${{ item.product.price * item.qty }}</span>
            </div>
          </div>
          <div class="shoppingSideBarTotal">
            <p>小計: NT${{ shopCartList.total }}</p>
          </div>
        </div>
        <router-link to="./cart" class="shoppingSideBarGetOrderBtn">下單去<i class="fas fa-arrow-right"></i></router-link>
      </div>
      <div class="shoppingSideBar" v-else>
        <div class="shoppingSideBarTitle">
          <span>購物車內容</span>
          <i class="fas fa-times" @click="sideBarClose"></i>
        </div>
        <div class="shoppingSideBarZero">購物車目前是空的! 快去商場逛逛吧~</div>
      </div>

      <!-- 購物車 Icon -->
      <div class="shoppingCartIcon" @click="sideBarOpen">
          <i class="fas fa-shopping-cart"></i>
          <div class="shoppingCartQty">{{ shopCartList.carts.length }}</div>
      </div>
    </div>

    <!-- 相關產品 -->
    <div class="row">
      <div class="col">
        <h2 class="relatedProductsTitle">相關產品</h2>
        <div class="relatedProductsContent col-4">
          <img src="#" alt="">
          <p>{{ totalRelatedProducts }}</p>
          <span>價錢</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      shopId: '',
      productData: {},
      shopCartList: {},
      isLoading: false,
      coupon_code: '',
      totalShoppingList: {},
      totalProducts: {},
      totalRelatedProducts: []
    }
  },
  methods: {
    getShopData () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.shopId}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        response.data.product.num = 1
        vm.productData = response.data.product
        vm.isLoading = false
      })
    },
    addToShopCart (shopId, num = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      const shopData = {
        product_id: shopId,
        qty: num
      }
      vm.$http.post(api, { data: shopData }).then(function () {
        vm.getShopCartContent()
        vm.isLoading = false
      })
    },
    getShopCartContent () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.$http.get(api).then((response) => {
        vm.shopCartList = response.data.data
      })
    },
    delShopingCartList (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const vm = this
      vm.isLoading = true
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.getShopCartContent()
          vm.isLoading = false
          if (response.data.success) {
            vm.$bus.$emit('message:push', response.data.message, 'danger')
          }
        }
      })
    },
    useCoupon () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      vm.$http.post(api, { data: coupon }).then(function () {
        vm.isLoading = false
      })
    },
    backPage () {
      this.$router.back()
    },
    delAllShoppingCartList () {
      const vm = this
      const getAllID = vm.shopCartList.carts
      const itisID = []
      vm.isLoading = true
      getAllID.forEach(function (item) {
        itisID.push(item.id)
      })
      const apiary = []
      itisID.forEach(function (id) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
        apiary.push(vm.$http.delete(api).then(function () {
        }))
      })
      Promise.all(apiary).then(function () {
        vm.isLoading = false
        vm.getShopCartContent()
        if (vm.isLoading === false) {
          vm.$bus.$emit('message:push', '已全部刪除', 'danger')
        }
      })
    },
    sideBarOpen () {
      $('.shoppingSideBar').css({ display: 'inline-block' }).animate({ right: '0%' }, 100)
    },
    sideBarClose () {
      $('.shoppingSideBar').css({ display: 'none' })
    },
    getRelatedProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const vm = this
      vm.$http.get(api).then((response) => {
        vm.totalProducts = response.data.products
        vm.totalRelatedProducts = vm.totalProducts.filter(function (item) {
          return vm.productData.category === item.category
        })
      })
    }
  },
  created () {
    this.shopId = this.$route.params.shopId
    this.getShopData()
    this.getShopCartContent()
    this.getRelatedProduct()
  }
}
</script>

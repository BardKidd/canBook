<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row shopPaddingTop shopPaddingBottom">
      <a class="backShop" @click.prevent="backPage">
        <i class="fas fa-backward"></i> 回到商品區
      </a>
    </div>
    <div class="row shopCheckBox">
      <!-- 產品照片 -->
      <div class="col-4">
        <img :src="productData.imageUrl" alt />
      </div>

      <!-- 產品內容 -->
      <div class="col-4 productShop">
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
      <div class="shoppingCartList col-4">
        <div class="shoppingCartListTitle">
          <strong>購物車清單</strong>
          <button type="button" class="btn btn-outline-danger" @click.prevent="delAllShoppingCartList">清空購物車</button>
          <div class="countRound" v-if="shopCartList.carts.length !== 0">{{ shopCartList.carts.length }}</div>
          <div class="countRound" v-if="shopCartList.carts.length === 0">0</div>
        </div>
        <div class="lumpSum">
          <strong>總額</strong>
          <span>NT: {{ shopCartList.total }}</span>
        </div>
        <div class="lumpSum" v-if="shopCartList.total !== shopCartList.final_total">
          <strong>折扣後</strong>
          <span>NT: {{ Math.round(shopCartList.final_total) }}</span>
        </div>
        <div class="shoppingCartContent" v-for="(item, key) in shopCartList.carts" :key="key">
          <button type="button" class="btn btn-outline-danger" @click.prevent="delShopingCartList(item.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
          <div>
            <p>{{ item.product.title }}</p>
            <p>{{ item.qty }} / {{ item.product.unit }}</p>
          </div>
          <span>NT: {{ item.total }}</span>
        </div>
        <div class="enterCoupon">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
          <div class="input-group-append">
            <button class="btn" type="button" @click.prevent="useCoupon">送出</button>
          </div>
        </div>
      </div>

      <!-- 結帳 Icon -->
      <router-link to="../cart">
          <div class="shoppingCartIcon">
              <i class="fas fa-shopping-cart"></i>
              <div class="shoppingCartQty">{{ shopCartList.carts.length }}</div>
          </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      shopId: '',
      productData: {},
      shopCartList: {},
      isLoading: false,
      coupon_code: '',
      totalShoppingList: {}
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
    }
  },
  created () {
    this.shopId = this.$route.params.shopId
    this.getShopData()
    this.getShopCartContent()
  }
}
</script>
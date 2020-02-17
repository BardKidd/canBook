<template>
  <div class="container">
    <div class="row shopPaddingTop">
      <div class="scheduleShow col-12">
        <ul>
          <li><p>1.填寫訂購資料</p></li>
          <li><p>2.付款確認</p></li>
          <li><p>3.完成訂單</p></li>
        </ul>
      </div>
      
      <router-link class="backShop" to="/canbook/shop">
        <i class="fas fa-backward"></i> 回到商品區
      </router-link>

      <div class="col-12 cartData">
        <!-- 購物車內容 -->
        <div class="shoppingCartList col-4">
          <div class="shoppingCartListTitle">
              <strong>購物車清單</strong>
              <button type="button" class="btn btn-outline-danger">清空購物車</button>
              <div class="countRound" v-if="totalShoppingList.carts.length !== 0">{{ totalShoppingList.carts.length }}</div>
              <div class="countRound" v-if="totalShoppingList.carts.length === 0">0</div>
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
              <button type="button" class="btn btn-outline-danger" @click.prevent="delShopingCartList(item.id)"><i class="fas fa-trash-alt"></i></button>
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

        <!-- 訂單資訊 -->
        <div class="orderData col-8">
          <p class="orderTitle">訂單資訊</p>
          <form @submit.prevent="sendOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" v-model="form.user.email" class="form-control" name="email" id="useremail" placeholder="請輸入 Email" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}">
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" v-model="form.user.name" :class="{'is-invalid ': errors.has('name')}" class="form-control" name="name" v-validate="'required'" id="username" placeholder="請輸入姓名">
              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
            </div>

            <div class="form-group">
              <label for="username">收件人手機</label>
              <input type="text" v-model="form.user.tel" :class="{'is-invalid': errors.has('tel')}" class="form-control" name="tel" v-validate="'phone'" id="usertel" placeholder="請輸入手機">
              <span class="text-danger" v-if="errors.has('tel')">{{ '手機' + errors.first('tel') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人地址</label>
              <input type="text" v-model="form.user.address" :class="{'is-invalid': errors.has('address')}" class="form-control" name="address" v-validate="'required'" id="useraddress" placeholder="請輸入地址">
              <span class="text-danger" v-if="errors.has('address')">請輸入收件人地址</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" v-model="form.message" id="comment" class="form-control" cols="30" rows="10"></textarea>
            </div>

            <div class="text-right">
              <button class="btn btn-primary">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalShoppingList: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cartId: '',
    }
  },
  methods: {
    getShoppingCartList() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.totalShoppingList = response.data.data;
      })
    },
    sendOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if(result) {
          if(vm.totalShoppingList.carts.length >= 1){
            this.$http.post(api, {data: order}).then((response) => {
              if(response.data.success) {
                vm.cartId = response.data.orderId;
                vm.$router.push(`cart/${vm.cartId}`);
              }
            })
          }
          else {
            vm.$bus.$emit('message:push', '購物車沒有商品喔 快去商店看看吧~', 'primary');
          }
        }
      })
      
    }

  },
  created() {
    this.getShoppingCartList()
  }
}
</script>
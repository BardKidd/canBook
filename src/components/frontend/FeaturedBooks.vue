<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <!-- 封面大圖 -->
    <div class="indexCover">
        <div class="round" @click="clickRoundBtn"><i class="fas fa-caret-down"></i></div>
    </div>

    <!-- 精選書籍 -->
    <div class="bg-primary">
      <div class="container">
        <div class="homeTitleFontStyleBox">
            <h2 class="homeTitleFontStyle">精選書籍</h2>
        </div>
        <div class="row mx-5" id="featuredBooks">
          <div class="col-4" v-for="(item, key) in featuredBooksProducts" :key="key">
              <div class="p-3 cardBox" @click.prevent="oneProductData(item.id)">
                  <img :src="item.imageUrl" alt="">
              </div>
              <div class="cardFontStyle">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.category }}</span>
                  <p class="moreFontStyle" @click.prevent="oneProductData(item.id)">More <i class="fas fa-angle-double-right"></i></p>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 優惠驚喜 -->
    <div class="bg-primaryDark">
      <div class="container">
        <div class="row">
            <div class="col-12 surpriseTitle">優惠驚喜</div>
            <div class="col-12 surpriseCode">
                <div class="surpriseBox">
                  <strong>[好書優惠]</strong>
                  <span>神秘優惠驚喜</span>
                  <p>- ilovebook2020 -</p>
                  <span>享5折優惠</span>
                </div>
            </div>
            <div class="col-12 surpriseBtn">
              <router-link to="./shop">購物去</router-link>
            </div>
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
      featuredBooksProducts: {},
      isLoading: false,
      shopId: ''
    }
  },
  methods: {
    getFeaturedBooks () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      const vm = this
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.featuredBooksProducts = response.data.products
        vm.isLoading = false
      })
    },
    clickRoundBtn () {
      const moveTop = $('.homeTitleFontStyleBox').offset().top
      $('body, html').animate({
        scrollTop: moveTop
      }, 500)
    },
    oneProductData (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      const vm = this
      vm.shopId = id
      vm.isLoading = false
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$router.push(`shop/${vm.shopId}`)
        }
        vm.isLoading = true
      })
    }
  },
  created () {
    this.getFeaturedBooks()
  }
}
</script>

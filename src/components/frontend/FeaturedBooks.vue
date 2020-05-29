<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 封面大圖 -->
    <div class="indexCover">
      <h1 class="indexTitle">向下尋找</h1>
      <p class="indexTitle2">這裡總有一本屬於你的書</p>
      <div class="round" @click="clickRoundBtn">
        <i class="fas fa-caret-down"></i>
      </div>
    </div>

    <!-- 精選書籍 -->

    <div class="container">
      <div class="homeTitleFontStyleBox">
        <h2 class="homeTitleFontStyle">精選書籍</h2>
      </div>
      <div class="row mx-5" id="featuredBooks">
        <div class="col-4" v-for="(item, key) in featuredBooksProducts" :key="key">
          <div class="p-3 cardBox" @click.prevent="oneProductData(item.id)">
            <img :src="item.imageUrl" alt />
          </div>
          <div class="cardFontStyle">
            <strong>{{ item.title }}</strong>
            <span>{{ item.category }}</span>
            <p class="moreFontStyle" @click.prevent="oneProductData(item.id)">
              More
              <i class="fas fa-angle-double-right"></i>
            </p>
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
              <span>歡慶周年-神秘優惠驚喜</span>
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

    <!-- 輕小說週 -->
    <div class="bg-primary">
      <div class="container">
        <div class="row">
          <h2 class="col-12 ranobeTitle">- 嶄新的青春群像小說，故事邁向最終章 -</h2>
          <div
            class="col-3 ranobeContent"
            @click.prevent="oneProductData(item.id)"
            v-for="(item, key) in allRanobe.slice(-5, -1)"
            :key="key"
          >
            <div class="ranobeImgBox">
              <img :src="item.imageUrl" alt />
            </div>
            <div class="ranobeImgBoxBack">
              <p></p>
            </div>
            <div class="ranobeFontStyle">
              <strong>{{ item.title }}</strong>
            </div>
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
      shopId: '',
      allRanobe: {}
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
      $('body, html').animate(
        {
          scrollTop: moveTop
        },
        500
      )
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
    },
    getAllRanobe () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const vm = this
      vm.$http.get(api).then((response) => {
        const totalBooks = response.data.products
        vm.allRanobe = totalBooks.filter((item) => item.category === '輕小說')
      })
    }
  },
  created () {
    this.getFeaturedBooks()
    this.getAllRanobe()
  }
}
</script>

<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <div class="indexCover">
        <div class="round" @click="clickRoundBtn"><i class="fas fa-caret-down"></i></div>
    </div>
    <div class="row mx-5 my-5" id="featuredBooks">
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
  
</template>

<script>
import $ from 'jquery';
export default {
    data() {
        return {
            featuredBooksProducts: {},
            isLoading: false,
            shopId: '',
        }
    },
    methods: {
        getFeaturedBooks() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                vm.featuredBooksProducts = response.data.products;
                vm.isLoading = false;
            })
        },
        clickRoundBtn() {
            let moveTop = $('#featuredBooks').offset().top;
            $('body, html').animate({
                scrollTop: moveTop,
            }, 500)
        },
        oneProductData(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.shopId = id;
            vm.isLoading = false;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                if(response.data.success) {
                    vm.$router.push(`shop/${vm.shopId}`);
                }
                vm.isLoading = true;
            })
        }
    },
    created() {
        this.getFeaturedBooks();
    }
}
</script>
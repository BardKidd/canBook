<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 商品列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="120">Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key">
          <td>{{ item.paid_date }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>
            <button type="button" class="btn btn-primary btn-sm">編輯</button>
            <button type="button" class="btn btn-danger btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination :pagination = pagination @emitPage = getOrderlist></Pagination>

  </div>
</template>

<script>
import Pagination from './Pagination';
export default {
    components: {
        Pagination,
    },
    data() {
        return {
            pagination: {},
            isLoading: false,
            orders: [],
        }
    },
    methods: {
        getOrderlist() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                vm.pagination = response.data.pagination;
                vm.orders = response.data.orders;
                vm.isLoading = false;
            })
        }
    },
    created() {
        this.getOrderlist();
    }
}
</script>
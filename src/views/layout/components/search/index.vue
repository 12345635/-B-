<template>
  <div class="search">
    <a-form layout="inline" @submit.prevent="handleSubmit">
      <a-form-item label="搜索关键字">
        <a-input
          v-model="searchWord"
          v-decorator="[
            'note',
            { rules: [{ required: true, message: 'Please input your note!' }] },
          ]"
        />
      </a-form-item>
      <a-form-item a-form-item label="商品类目">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item
              @click="handleMenuClick(i)"
              v-for="(item, i) in productTypeList"
              :key="item.id"
              >{{ item.name }}
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            {{ category }} <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24, offset: 5 }" class="add">
        <a-button type="default">
          <RouterLink to="/add">新增商品 </RouterLink>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      category: "请选择商品类目",
      productId: null,
      searchWord: "",
    };
  },
  computed: mapState("product", ["productTypeList"]),
  methods: {
    handleSubmit() {
      this.$emit("handleSubmit", {
        searchWord: this.searchWord,
        category: this.productId,
      });
    },
    handleMenuClick(index) {
      this.category = this.productTypeList[index].name;
      this.productId = this.productTypeList[index].id;
    },
  },
};
</script>
<style scoped lang="less">
.search {
  position: relative;
  .add {
    position: absolute;
    right: 0;
  }
}
</style>
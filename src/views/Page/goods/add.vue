<template>
  <div class="add-product" ref="add-product">
    <!-- 步骤条 -->
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <GoodsDetail v-if="current == 0" />
        <GoodsSaleDetail v-if="current == 1" @onSubmit="onSubmit"/>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsDetail from "@/components/GoodsDetail";
import GoodsSaleDetail from "@/components/GoodsSaleDetail";
import { mapState } from "vuex";
export default {
  computed: mapState("product", ["steps", "current"]),
  components: {
    GoodsDetail,
    GoodsSaleDetail,
  },
  data() {
    return {
      form: {
        title: "",
        desc: "",
        category: null,
        c_items: "",
        tags: [],
        price: "",
        price_off: "",
        unit: null,
        inventory: "",
        status: null,
        images: [],
      },
    };
  },
  methods: {
    // 提交按钮
    onSubmit() {
      // 编辑提交
      if (this.$route.params.id) {
        this.$api.Edit(this.$store.state.product.form).then(
          () => {
            this.$store.dispatch("product/getProductList", {
              page: 1,
              size: 10,
              searchWord: "",
              category: null,
            });
            this.$router.push("/list");
            this.$store.commit("product/setCurrent",0)
          },
          (error) => {
            alert(error);
          });

      } else {
        // 添加提交
        // 需要判断有没有值
        for (const item in this.$store.state.product.form) {
          if(!this.$store.state.product.form[item]){
            return
          }else{
            this.$api.Add(this.$store.state.product.form).then(
          () => {
            this.$store.dispatch("product/getProductList", {
              page: 1,
              size: 10,
              searchWord: "",
              category: null,
            });
            this.$router.push("/list").catch(()=>{});
            this.$store.commit("product/setCurrent",0)
          },
          (error) => {
            alert(error);
          });
          }
        }
      }
    },
    isEdit() {
      // 根据是否进入的编辑页面判断 是否渲染产品信息
      if (this.$route.params.id) {
        this.$api.product(this.$route.params.id).then(
          (r) => {
            const data = r.data;
            for (const key in data) {
              this.$store.dispatch("product/setProduct", {
                key,
                value: data[key],
              });
            }
          },
          (error) => {
            alert(error);
          }
        );
      } else {
        this.$store.dispatch("product/resetProduct", {...this.form});
      }
    },
  },
  created() {
    this.isEdit();
  },
  watch: {
    $route(val) {
      this.isEdit();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
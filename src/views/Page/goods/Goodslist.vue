<template>
  <div class="goodslist">
    <Search @handleSubmit="handleSubmit"/>
    <List @changePage="handlePage"/>
  </div>
</template>
<script>
import Search from "@/views/layout/components/search";
import List from "@/components/list.vue";
export default {
  data(){
    return {
      page:{},
      seach:{},
    }
  },
  components: {
    Search,
    List,
  },
  async created(){
    this.$store.dispatch("product/getProductTypeList");
  },
  methods:{
    handlePage(event){
      this.page = event;
      this.$store.dispatch("product/getProductList",{...this.page,...this.seach});
    },
    handleSubmit(event){
      this.seach = event;
      this.$store.dispatch("product/getProductList",{
        ...this.page,
        ...this.seach
        });
    }
  }
};
</script>
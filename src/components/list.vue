<template>
  <a-table
    :columns="columns"
    :data-source="productList"
    :row-key="(record) => record._id"
    :pagination="pagination"
    @change="onChange"
  >
    <template slot="category" slot-scope="record">
      <div>
        {{ productTypeList[record-1] ? productTypeList[record-1].name :" " }}
      </div>
    </template>
    <template slot="status" slot-scope="record">
      <div>
        {{ record ? "上架" : "下架" }}
      </div>
    </template>
    <template slot="operation" slot-scope="record">
      <div>
        <a-button @click.prevent="edit(record)">编辑</a-button>
        <a-button @click.prevent="remove(record.id)">删除</a-button>
      </div>
    </template>
  </a-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          title: "id",
          dataIndex: "id",
        },
        {
          title: "标题",
          dataIndex: "title",
          width: "20%",
        },
        {
          title: "描述",
          dataIndex: "desc",
        },
        {
          title: "类目",
          dataIndex: "category",
          scopedSlots: { customRender: "category" },
        },
        {
          title: "预售价格",
          dataIndex: "price",
        },
        {
          title: "折扣价格",
          dataIndex: "price_off",
        },
        {
          title: "销量",
          dataIndex: "sale",
        },
        {
          title: "标签",
          dataIndex: "tags",
        },
        {
          title: "购买数量",
          dataIndex: "inventory",
        },
        {
          title: "上架状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "operation" },
        },
      ],
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  computed: mapState("product", ["productTypeList","productList"]),
  async created() {
    this.$store.dispatch("product/getProductList",)
  },
  methods: {
    handleTableChange() {},
    edit(product) {
      this.$router.push({
        path:`/goods/edit/${product.id}`
      });
    },
    onChange(pageNumber) {
      this.$emit("changePage",pageNumber);
      this.pagination = pageNumber;
    },
    remove(id){
      this.$api.remove(id).then(()=>{
        this.$store.dispatch("product/getProductList");
      },(error)=>{
        alert(error);
      });
    }
  },
};
</script>

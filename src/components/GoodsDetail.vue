<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- 标题 -->
    <a-form-model-item label="标题" prop="title" required validateField>
      <a-input
        :value="form.title"
        @change="edit('title', $event.target.value)"
      />
    </a-form-model-item>
    <!-- 商品描述 -->
    <a-form-model-item label="商品描述" prop="desc">
      <a-input :value="form.desc" @change="edit('desc', $event.target.value)" />
    </a-form-model-item>
    <!-- 商品类目 -->
    <a-form-model-item label="商品类目" prop="category" required>
      <a-select
        :value="form.category"
        placeholder="请选择商品类目"
        @change="edit('category', $event)"
      >
        <a-select-option
          :value="item.id"
          v-for="item in productTypeList"
          :key="item.id"
          @change="edit('desc', $event.target.value)"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- 商品子类目 -->
    <a-form-model-item :wrapper-col="{ span: 12, offset: 7 }" prop="c_items">
      <a-select
        placeholder="请选择所属子类目"
        :value="form.c_items ? form.c_items : form.c_item"
        @change="edit('c_items', $event)"
      >
        <template>
          <a-select-option v-for="item in c_items" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </template>
      </a-select>
    </a-form-model-item>
    <!-- 商品标签 -->
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        :value="form.tags"
        placeholder="选择标签"
        @change="edit('tags', $event)"
      >
        <a-select-option v-for="(tag, index) in tags" :key="index" :value="tag">
          {{ tag }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 24, offset: 10 }">
      <a-button
        v-if="current == 0"
        style="margin-left: 8px"
        type="primary"
        @click="onSubmit"
      >
        下一页
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      tags: ["包邮，最晚次日达"],
      other: "",
      rules: {},
    };
  },
  computed: {
    ...mapState("product", ["productTypeList", "current", "form"]),
    c_items() {
      return this.form.category
        ? this.productTypeList[this.form.category - 1].c_items
        : [];
    },
  },
  created() {
    this.$store.dispatch("product/getProductTypeList");
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.commit("product/setCurrent", this.current + 1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    edit(key, value) {
      this.$store.commit("product/setForm", { key, value });
      return;
    },
  },
};
</script>

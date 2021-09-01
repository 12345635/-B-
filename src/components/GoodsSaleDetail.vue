<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- 商品售价 -->
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input
        :value="form.price"
        @change="edit('price', $event.target.value)"
      />
    </a-form-model-item>
    <!-- 商品折扣价 -->
    <a-form-model-item label="商品折扣价" prop="price_off">
      <a-input
        :value="form.price_off"
        @change="edit('price_off', $event.target.value)"
      />
    </a-form-model-item>
    <!-- 商品库存 -->
    <a-form-model-item label="商品库存" prop="inventory">
      <a-input
        :value="form.inventory"
        @change="edit('inventory', $event.target.value)"
      />
    </a-form-model-item>
    <!-- 计量单位 -->
    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input :value="form.unit" @change="edit('unit', $event.target.value)" />
    </a-form-model-item>
    <!-- 商品上架状态 -->
    <a-form-model-item label="上架状态" prop="status">
      <a-radio-group
        name="radioGroup"
        :default-value="form.status == '1' ? form.status : 0"
      >
        <a-radio :value="1" @change="edit('status', 1)"> 上架 </a-radio>
        <a-radio :value="0" @change="edit('status', 0)"> 下架</a-radio>
      </a-radio-group>
    </a-form-model-item>

    <!-- 商品相册 -->
    <a-form-model-item label="商品相册" prop="images">
      <div class="clearfix">
        <a-upload
          :action="`https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.isLogin.cookie.appkey}`"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 24, offset: 10 }">
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        上一页
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        style="margin-left: 8px"
        type="primary"
        @click="onSubmit"
      >
        提交
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapState } from "vuex";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      rules: {},
      previewVisible: false,
      previewImage: "",
    };
  },
  computed: {
    ...mapState("product", ["current", "steps", "form"]),
    fileList() {
      let fileList = [];
      if (this.form.images.length >= 1) {
        fileList = this.form.images.map((item, index) => {
          return {
            uid: index,
            name: "image.png",
            status: "done",
            url: item,
          };
        });
      }
      return fileList;
    },
  },
  created() {
    this.$store.dispatch("product/getProductTypeList");
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("onSubmit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
      }
      if (file.status === "done") {
        this.$message.success("上传成功");
        file.url = file.response.data.url;
        file.thumbUrl = file.response.data.thumbUrl;
        this.form.images.push(file.url);
      } else {
        this.fileList = fileList;
      }
    },
    edit(key, value) {
      this.$store.commit("product/setForm", { key, value });
      return;
    },
    prev() {
      this.$store.commit("product/setCurrent", this.current - 1);
    },
    next() {
      this.$store.commit("product/setCurrent", this.current + 1);
    },
  },
};
</script>

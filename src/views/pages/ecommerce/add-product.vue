<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { getProductImageUrl } from "@/services/api/products";
import { getDesignersCats } from "@/services/api/products";
import { getShops } from "@/services/api/products";
import { addProduct } from "@/services/api/products";
export default {
  components: {
    Layout,
    PageHeader,
    FormWizard,
    TabContent,
  },
  data() {
    return {
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 3,
      color: "#79c120",
      title: "Add Product",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Add Product",
          active: true,
        },
      ],
      productImages: [],
      tableData: [],
      designersCats: [],
      shopsData: [],
      propertyImage: "",
      properties: [
        {
          component: "div",
          class: "row",
          children: [
            {
              type: "color",
              name: "pickedColor",
              label: "Pick a color",
              placeholder: "Sample color placeholder",
              help: "Sample color help text",
              validation: "required",
              value: "#3eaf7c",
              "error-behavior": "live",
              class: "col-lg-3",
            },
            {
              type: "text",
              name: "size",
              label: "Size",
              class: "col-lg-3",
              validation: "required",
            },
            {
              type: "number",
              name: "proprice",
              label: "Price",
              class: "col-lg-3",
              validation: "required",
            },
            {
              type: "number",
              name: "pquantity",
              label: "Quantity",
              class: "col-lg-3",
              validation: "required",
            },
          ],
        },
      ],
      values: {},
      fields: [
        { key: "color", sortable: true },
        { key: "size", sortable: true },
        { key: "price", sortable: true },
        { key: "quantity", sortable: true },
        { key: "image", sortable: true },
      ],
    };
  },
  mounted() {
    this.getAllDesignersCats();
    this.getAllShops();
  },
  computed: {
    step1() {
      return [
        {
          component: "div",
          class: "row",
          children: [
            {
              type: "text",
              name: "name_en",
              label: "English Name",
              class: "col-sm-6 col-12",
              validation: "required",
            },
            {
              type: "text",
              name: "name_ar",
              label: "Arabic Name",
              class: "col-sm-6 col-12",
              validation: "required",
            },
          ],
        },
        {
          component: "div",
          class: "row",
          children: [
            {
              type: "number",
              name: "quantity",
              label: "Quantity",
              class: "col-lg-3",
              validation: "required",
            },
            {
              type: "number",
              name: "price",
              validation: "required",
              label: "Price",
              class: "col-lg-3",
            },
            {
              type: "select",
              name: "cat_id",
              label: "Category",
              class: "col-lg-3",
              validation: "required",
              options: this.designersCats,
              placeholder: "Select Category",
            },
            {
              type: "select",
              name: "shop_id",
              label: "Shop",
              options: this.shopsData,
              validation: "required",
              placeholder: "Select Shop",
              class: "col-lg-3",
            },
          ],
        },
        {
          component: "div",
          class: "row",
          children: [
            {
              type: "checkbox",
              name: "offerprice",
              label: "Offer Price",
              class: "col-lg-3",
              validation: "required",
            },

            {
              type: "checkbox",
              name: "featured",
              validation: "required",
              label: "Featured",
              class: "col-lg-3  pt-0",
            },

            {
              type: "checkbox",
              name: "isservice",
              label: "Is service",
              class: "col-lg-3 pt-0",
              validation: "required",
            },
            {
              type: "checkbox",
              name: "popular",
              label: "Popular",
              validation: "required",
              class: "col-lg-3 pt-0",
            },
          ],
        },
        {
          component: "div",
          class: "row",
          children: [
            {
              type: "textarea",
              name: "desc_en",
              label: "English Description",
              class: "col-sm-6 col-12",
              validation: "required",
            },
            {
              type: "textarea",
              name: "desc_ar",
              label: "Arabic Description",
              class: "col-sm-6 col-12",
              validation: "required",
            },
          ],
        },
      ];
    },
  },
  methods: {
    getAllShops() {
      getShops()
        .then((res) => {
          res.data.data.forEach((el) => {
            this.shopsData.push({
              label: el.en_shop_name,
              value: el.id,
            });
          });
          console.log(this.shopsData);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async getAllDesignersCats() {
      this.designersCats = [];
      await getDesignersCats()
        .then((res) => {
          res.data.data.forEach((el) => {
            this.designersCats.push({
              label: el.name_en,
              value: el.id,
            });
          });
          console.log(this.designersCats);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addProperties() {
      this.tableData.push({
        color: this.values.pickedColor,
        size: this.values.size,
        price: this.values.proprice,
        quantity: this.values.pquantity,
        image: this.propertyImage,
      });
    },
    tabChanged() {
      window.scrollTo(0, 0);
    },
    validatProperties() {
      if (this.$refs["proprty"].isValid == false) {
        this.$bvToast.toast(`Please fill in all the required fields.`, {
          variant: "danger",
          title: "Invild Input ",
          toaster: "b-toaster-top-center",
          autoHideDelay: 10000,
        });
      } else {
        return this.$refs["proprty"].isValid;
      }
    },
    validateStep1() {
      if (this.$refs["firstStep"].isValid == false) {
        this.$bvToast.toast(`Please fill in all the required fields.`, {
          variant: "danger",
          title: "Invild Input ",
          toaster: "b-toaster-top-center",
          autoHideDelay: 10000,
        });
      } else {
        return this.$refs["firstStep"].isValid;
      }
    },
    checkColor() {
      console.log(this.color);
    },
    onPropertyfileSelected(event) {
      this.getPropertyImageUrl(event);
      return Promise.resolve({});
    },
    async getPropertyImageUrl(event) {
      const image2 = new FormData();
      image2.append("image", event);
      await getProductImageUrl(image2).then((res) => {
        this.propertyImage = res.data;
        console.log(this.propertyImage);
      });
    },
    /* eslint-disable */
    onProductfilesSelected(event, progress, error, option) {
      this.getImageURL(event);
      return Promise.resolve({});
      // this.getImageURL(event);
    },
    /* eslint-enable */
    async getImageURL(event) {
      const img1 = new FormData();
      img1.append("image", event);
      await getProductImageUrl(img1).then((res) => {
        this.productImages.push(res.data);
        console.log(this.productImages);
      });
    },
    async submitProductForm() {
      var data = this.values;
      console.log(this.values);
      data.featured = this.values.featured ? 1 : 0;
      data.popular = this.values.popular ? 1 : 0;
      data.isservice = this.values.isservice ? 1 : 0;
      data.offerprice = this.values.offerprice ? 1 : 0;
      data.images = this.productImages;
      data.product_properties = this.tableData;
      console.log(data);
      addProduct(data).then((res) => {
        console.log(res);
        console.log("Product is Added");
        if (res) {
          this.makeToast(true);
          setTimeout(() => {
            this.$router.push({ name: "products" });
          }, 5000);
        } else {
          this.$bvToast.toast("Product is not added", {
            title: "Error! Adding a product",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-top-center",
          });
          setTimeout(() => {
            this.$router.push({ name: "products" });
          }, 5000);
        }
      });
    },
    makeToast(append = false) {
      this.$bvToast.toast(`New Product is Added`, {
        title: "Add Product ",
        autoHideDelay: 10000,
        appendToast: append,
        variant: "success",
        toaster: "b-toaster-top-center",
      });
    },
  },
};
</script>
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form-wizard
              @on-complete="submitProductForm"
              color="#5664d2"
              finishButtonText="Submit"
              step-size="md"
            >
              <tab-content
                icon="fab fa-product-hunt"
                :before-change="validateStep1"
              >
                <FormulateForm
                  ref="firstStep"
                  name="firstStep"
                  v-model="values"
                  :schema="step1"
                />
                <FormulateInput
                  type="image"
                  label="Select your documents to upload"
                  help="Select one or more PDFs to upload"
                  validation="mime:image/jpeg,image/png,image/gif|required"
                  :uploader="onProductfilesSelected"
                  multiple
                />
              </tab-content>
              <tab-content
                title="Properties"
                icon="fa fa-check"
                :before-change="validatProperties"
              >
                <div class="table-responsive mb-0">
                  <b-table :items="tableData" :fields="fields" responsive="sm">
                    <template #cell(color)="data">
                      <div
                        :style="`background-color: ${data.item.color};height:30px; width:63px `"
                      ></div>
                      {{ data.item.color }}
                    </template>
                    <template #cell(image)="data">
                      <div>
                        <img
                          :src="data.item.image"
                          style="height: 50px; width: height: 50px "
                        />
                      </div>
                    </template>
                  </b-table>
                </div>
                <div class="proData">
                  <FormulateForm
                    v-model="values"
                    :schema="properties"
                    ref="proprty"
                  />
                  <b-button @click="addProperties()" variant="#5663d2;">
                    Add Property
                  </b-button>
                </div>
                <FormulateInput
                  type="image"
                  label="Select your documents to upload"
                  help="Select one or more PDFs to upload"
                  validation="mime:image/jpeg,image/png,image/gif"
                  :uploader="onPropertyfileSelected"
                />
              </tab-content>
            </form-wizard>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<style >
.proData {
  position: relative;
  margin-top: 50px;
}
.proData button {
  font-family: "Nunito", sans-serif;
  border-width: 2px;
  background-color: #5663d2;
  border-color: #5663d2;
  font-size: 14px;
  color: white;
  font-weight: 600;
  min-width: 140px;
  margin: 120px 45%;
  position: absolute;
}
.table-responsive {
  height: 150px;
}
</style>
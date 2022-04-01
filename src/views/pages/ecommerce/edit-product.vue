<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { getProductImageUrl } from "@/services/api/products";
import { getDesignersCats } from "@/services/api/products";
import { editProduct } from "@/services/api/products";
import { getShops } from "@/services/api/products";

export default {
  props: ["selectedProduct"],
  components: {
    Layout,
    PageHeader,
    FormWizard,
    TabContent,
  },
  data() {
    return {
      proElement: [],
      showForm: false,
      newColor: "",
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 3,
      color: "#79c120",
      title: "Update Product",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Update Product",
          active: true,
        },
      ],
      productImages: [],
      tableData: [],
      proImages: [],
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

              value: "#3eaf7c",
              "error-behavior": "live",
              class: "col-lg-3",
            },
            {
              type: "text",
              name: "size",
              label: "Size",
              class: "col-lg-3",
            },
            {
              type: "number",
              name: "proprice",
              label: "Price",
              class: "col-lg-3",
            },
            {
              type: "text",
              name: "pquantity",
              label: "Quantity",
              class: "col-lg-3",
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
        { key: "edit", label: "Edit", class: "text-center" },
      ],
    };
  },
  mounted() {
    this.getPassedProduct();
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
            },
            {
              type: "text",
              name: "name_ar",
              label: "Arabic Name",
              class: "col-sm-6 col-12",
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
            },
            {
              type: "number",
              name: "price",
              label: "Price",
              class: "col-lg-3",
            },
            {
              type: "select",
              name: "cat_id",
              label: "Category",
              class: "col-lg-3",
              options: this.designersCats,
              placeholder: "Select Category",
            },
            {
              type: "select",
              name: "shop_id",
              label: "Shop",
              options: this.shopsData,
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
            },

            {
              type: "checkbox",
              name: "featured",
              label: "Featured",
              class: "col-lg-3  pt-0",
            },

            {
              type: "checkbox",
              name: "isservice",
              label: "Is service",
              class: "col-lg-3 pt-0",
            },
            {
              type: "checkbox",
              name: "popular",
              label: "Popular",
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
            },
            {
              type: "textarea",
              name: "desc_ar",
              label: "Arabic Description",
              class: "col-sm-6 col-12",
            },
          ],
        },
      ];
    },
  },
  methods: {
    async submitProductForm() {
      var data = this.values;
      console.log(this.values);
      data.featured = this.values.featured ? 1 : 0;
      data.popular = this.values.popular ? 1 : 0;
      data.isservice = this.values.isservice ? 1 : 0;
      data.offerprice = this.values.offerprice ? 1 : 0;
      data.images = this.productImages;
      data.product_properties = this.proElement;
      console.log(this.proElement.price);
      data.product_properties.price = this.proElement.proprice;
      data.product_properties.quantity = this.proElement.pquantity;
      data.product_properties.color = this.proElement.pickedColor;
      data.product_properties["image"] = this.propertyImage;
      console.log(data);
      await editProduct(data).then((res) => {
        console.log(res);
        if (res.data.success == true) {
          this.makeToast(true);
          setTimeout(() => {
            this.$router.push({ name: "products" });
          }, 5000);
        } else {
          this.$bvToast.toast("404 NOT FOUND", {
            title: "Error! While Updating the record",
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
    editTableData() {
      this.tableData.forEach((e) => {
        console.log(e);
        this.proElement = e;
        this.proElement.pquantity = this.proElement.quantity;
        this.proElement.proprice = this.proElement.price;
        this.proElement.pickedColor = this.proElement.color;
        this.proElement.image = this.proElement.property_images.image_path;
      });

      this.showForm = !this.showForm;
    },
    getPassedProduct() {
      let passRecivedProduct = this.$route.params.selectedProduct;
      this.values = passRecivedProduct;
      console.log(this.values);
      this.tableData = passRecivedProduct.properties;
      this.values.product_images.forEach((img) => {
        this.proImages.push(img);
        console.log(img);
      });
    },
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

    tabChanged() {
      window.scrollTo(0, 0);
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
      //this.getImageURL(event);
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
    makeToast(append = false) {
      this.$bvToast.toast(`Record is updated`, {
        title: "Product update ",
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
              <tab-content icon="fab fa-product-hunt">
                <FormulateForm
                  ref="firstStep"
                  name="firstStep"
                  v-model="values"
                  :schema="step1"
                />
                <div class="row gutters">
                  <div
                    class="product-images col-xl-3"
                    v-for="(pImage, index) in proImages"
                    :key="index"
                  >
                    <!--dgeel-->
                    <img
                      :src="pImage.image_path"
                      height="60"
                      width="60"
                      class="imageSrc"
                    />
                  </div>
                </div>

                <FormulateInput
                  type="image"
                  label="Select your documents to upload"
                  help="Select one or more PDFs to upload"
                  validation="mime:image/jpeg,image/png,image/gif|required"
                  :uploader="onProductfilesSelected"
                  multiple
                />
              </tab-content>
              <tab-content title="Properties" icon="fa fa-check">
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
                          :src="data.item.property_images.image_path"
                          style="height: 50px; width: height: 50px"
                        />
                      </div>
                    </template>
                    <template #cell(edit)>
                      <b-button variant="warning" @click="editTableData()"
                        >Edit</b-button
                      >
                    </template>
                  </b-table>
                </div>
                <div class="proData" v-if="showForm">
                  <FormulateForm
                    v-model="proElement"
                    :schema="properties"
                    ref="proprty"
                  />
                </div>

                <div class="proImagesFather" v-if="showForm">
                  <img
                    :src="proElement.image"
                    height="60"
                    width="60"
                    class="proImageOutPut col-0"
                  />
                  <FormulateInput
                    class="proImageInput col-sm-12"
                    type="image"
                    label="Select your documents to upload"
                    help="Select one or more PDFs to upload"
                    validation="mime:image/jpeg,image/png,image/gif"
                    :uploader="onPropertyfileSelected"
                  />
                </div>
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
.gutters {
  display: flex;
}
.product-images {
  flex: 0;
}
.proImagesFather {
  display: flex;
}
.proImageOutPut {
  flex: 0;
  margin-top: 35px;
}
.proImageInput {
  flex: 1;
  margin-left: 300;
}
</style>
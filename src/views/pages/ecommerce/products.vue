<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { getProducts } from "@/services/api/products";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { deleteproduct } from "@/services/api/products";

library.add(faUserSecret);
export default {
  page: {
    title: "Product",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      selectedProduct: null,
      tableData: [],
      dataLoading: false,

      title: "Products",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Products",
          active: true,
        },
      ],
      sliderPrice: 800,
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    editSelectedProduct(product) {
      this.$router.push({
        name: "edit-product",
        params: { selectedProduct: product },
      });
    },
    removeProduct(id) {
      if (
        this.$bvModal
          .msgBoxConfirm("Do you really want to delete?")
          .then((e) => {
            if (e == true) {
              deleteproduct({ id: id }).then((res) => {
                console.log(res);
                this.$bvToast.toast(`Product is Deleted`, {
                  title: "Delete Product ",
                  autoHideDelay: 5000,
                  variant: "success",
                  toaster: "b-toaster-top-center",
                });
                this.getAllProducts();
              });
            }
          })
      );
    },
    goToaddProduct() {
      this.$router.push({ name: "Add-product" });
    },
    getAllProducts() {
      this.dataLoading = true;
      this.tableData = [];
      getProducts()
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.dataLoading = false;
          console.log | "Loaded";
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
            <div>
              <div class="row">
                <div class="col-md-6">
                  <div>
                    <b-button
                      style="background-color: #5664d2; border-color: white"
                      class="mx-0 mb-2"
                      size="lg"
                      @click="goToaddProduct()"
                      round
                      outline
                      variant="success"
                    >
                      <i class="fas fa-plus" />
                    </b-button>
                  </div>
                </div>
                <v-color-picker
                  dot-size="25"
                  swatches-max-height="200"
                ></v-color-picker>
                <!-- Latest compiled and minified CSS -->
                <link rel="stylesheet" />
                <div class="col-md-6">
                  <div class="form-inline float-md-right">
                    <div class="search-box ml-2">
                      <div class="position-relative">
                        <input
                          type="text"
                          class="form-control rounded"
                          placeholder="Search..."
                        />
                        <i class="mdi mdi-magnify search-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div
                  class="col-xl-3 col-sm-6"
                  v-for="(item, index) in tableData"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img">
                      <div class="product-like"></div>
                      <img
                        src="@/assets/images/product/img-1.png"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div class="edit-delete">
                      <b-dropdown
                        right
                        no-caret
                        no-flip
                        variant="white"
                        size="sm"
                        toggle-class="arrow-none"
                      >
                        <template #button-content>
                          <b-icon icon="gear" style="color: #5664d2"></b-icon>
                        </template>
                        <b-dropdown-item
                          v-b-modal.edit-desiner-model
                          href="javascript:void(0);"
                          class="mr-3 text-primary"
                          v-b-tooltip.hover
                          title="Edit"
                          @click="editSelectedProduct(item)"
                        >
                          <i class="mdi mdi-pencil font-size-15"> Edit</i>
                        </b-dropdown-item>

                        <b-dropdown-item
                          variant="danger"
                          v-b-tooltip.hover
                          title="Delete"
                          @click="removeProduct(item.id)"
                        >
                          <i class="mdi mdi-trash-can font-size-15"> Delete</i>
                        </b-dropdown-item>
                      </b-dropdown>
                    </div>
                    <div class="text-center">
                      <h5 class="font-size-18">
                        <a href="#" class="text-dark">{{ item.name_en }}</a>
                      </h5>
                      <h6 class="mt-2 mb-0">SAR {{ item.price }}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-sm-6">
                  <div>
                    <p class="mb-sm-0 mt-2">
                      Page
                      <span class="font-weight-bold">2</span> Of
                      <span class="font-weight-bold">113</span>
                    </p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="float-sm-right">
                    <ul class="pagination pagination-rounded mb-sm-0">
                      <li class="page-item disabled">
                        <a href="#" class="page-link">
                          <i class="mdi mdi-chevron-left"></i>
                        </a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">1</a>
                      </li>
                      <li class="page-item active">
                        <a href="#" class="page-link">2</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">3</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">4</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">5</a>
                      </li>
                      <li class="page-item">
                        <a href="#" class="page-link">
                          <i class="mdi mdi-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
<style >
.btn-glyphicon {
  padding: 8px;
  background: #ffffff;
  margin-right: 4px;
}
.icon-btn {
  border-radius: 50px;
}
.product-box {
  box-shadow: 1px 1px 10px 2px #ededed;
  border: unset;
  border-radius: 8px;
  margin: 8px;
  position: relative;
  margin-left: 3px;
}
.edit-delete {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>


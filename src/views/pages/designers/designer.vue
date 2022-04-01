<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <link rel="stylesheet" />
          <div class="col-sm-6">
            <div class="float-left">
              <label
                class="d-inline-flex align-items-center"
                style="min-width: 60px; margin-top: 5px"
              >
                Show&nbsp;
                <b-form-select
                  v-model="perPage"
                  size="sm"
                  :options="pageOptions"
                  @change="perPageChange"
                ></b-form-select
                >&nbsp;entries
              </label>
            </div>
          </div>
          <div class="col-6">
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
        <DesinerModel v-on:hideModal="hideModel" />
        <div class="row no-gutters">
          <div class="col-xl-3" v-if="isLoading && currentPage == 1">
            <div class="product-box2" v-b-modal.desiner-model>
              <i class="fa fa-plus-circle the-plus" />
            </div>
          </div>
          <h6 v-if="isLoading == false">Loading........</h6>
          <img
            v-if="isLoading == false"
            style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              width: 50%;
            "
            src="../../../assets/images/7a8cbb7079d70bd64c469435a71b4db9 (1).gif"
          />
          <div
            class="col-xl-3"
            v-for="(designer, index) in designersData"
            :key="index"
          >
            <div
              class="product-box1"
              :style="`background:url(${designer.header_banner})`"
            >
              <div class="en_shop_name">
                <h5>{{ designer.en_shop_name }}</h5>
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
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </template>
                  <b-dropdown-item
                    v-b-modal.edit-desiner-model
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                    @click="editDesignerRecord(designer)"
                  >
                    <i class="mdi mdi-pencil font-size-15"> Edit</i>
                  </b-dropdown-item>

                  <b-dropdown-item
                    variant="danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click="deleteDesignerRecord(designer.id)"
                  >
                    <i class="mdi mdi-trash-can font-size-15"> Delete</i>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="float-right">
          <ul class="pagination pagination-rounded mb-4">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              @change="pageChange"
            ></b-pagination>
          </ul>
        </div>
      </div>
    </div>
    <EditDesinerModel
      :selectDesigner="selectDesigner"
      v-on:hideModal="closeModel"
    />
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import DesinerModel from "@/components/desinger-model";
import EditDesinerModel from "@/components/edit-designer-model";
import { getAllDesigner } from "@/services/api/designers";
import { deleteDesigner } from "@/services/api/designers";
export default {
  components: {
    Layout,
    PageHeader,
    DesinerModel,
    EditDesinerModel,
  },
  data() {
    return {
      selectDesigner: null,
      isLoading: false,
      openModal: false,
      title: "Designers",
      items: [
        {
          text: "Desingers",
        },
        {
          text: "List",
          active: true,
        },
      ],

      designersData: [],
      rows: 0,
      currentPage: 1,
      perPage: 11,
      pageOptions: [11, 25, 50, 100],
      catOptions: [1, 2, 4, 6, 3, 3],
    };
  },
  mounted() {
    this.getDesigners();
  },
  methods: {
    async getDesigners() {
      await getAllDesigner({ page: this.currentPage, perPage: this.perPage })
        .then((res) => {
          this.designersData = res.data.data.data;
          this.rows = res.data.data.total;
          if (res) {
            this.isLoading = true;
          } else {
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log | "Loaded";
        });
    },

    closeModel(data) {
      console.log(data);
      this.$router.go({ name: "designer" });
      this.$bvModal.hide("edit-desiner-model");
      this.selectDesigner = null;
    },
    hideModel(data) {
      if (data) {
        this.designersData.unshift(data);
      }
      this.$bvModal.hide("desiner-model");
      this.selectDesigner = null;
    },
    async deleteDesignerRecord(id) {
      if (
        this.$bvModal
          .msgBoxConfirm("Do you really want to delete?")
          .then((e) => {
            if (e == true) {
              deleteDesigner({ id: id }).then((res) => {
                console.log(res);
                this.$bvToast.toast(`Designer is deleted`, {
                  title: "Delete Designer ",
                  autoHideDelay: 4000,
                  variant: "success",
                  toaster: "b-toaster-top-center",
                });
                this.getDesigners();
              });
            }
          })
      );
    },
    editDesignerRecord(designer) {
      this.selectDesigner = designer;
    },

    pageChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getDesigners();
    },
    perPageChange() {
      this.getDesigners();
    },
    dataUpdated() {
      this.getDesigners();
    },
  },
};
</script>
<style>
.product-box1 {
  height: 300px;
  position: relative;
  display: flex;
  margin: 8px 8px 8px 8px;
  border: 0px solid;
  border-radius: 5px;
  box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
  -webkit-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
  -moz-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
  background-repeat: no-repeat;
  background-size: cover !important;
  background-color: white !important;
  opacity: 0.8;
}

.product-box1:hover {
  opacity: 1;
}

.the-plus {
  color: brown;
  margin: 130px 45%;
  color: #5664d2;
  font-size: 50px;
}
.product-box2 {
  height: 300px;
  margin: 5px;
  background-color: white;
  border: 1.5px solid;
  border-radius: 5px;
  border-color: blue;

  box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
  -webkit-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
  -moz-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.73);
}
.en_shop_name {
  flex: 2;
  font-weight: bold;
}
.en_shop_name h5 {
  display: inline-block;
  background-color: rgb(255 255 255 / 75%);
  color: #000000;
  padding: 4px 6px;
  /* border-bottom-right-radius: 8px; */
  font-size: 15px;
  font-weight: 400;
  min-width: 124px;
  border-radius: 6px;
  margin: 4px;
}
.edit-delete {
  flex: 0;
}
</style>
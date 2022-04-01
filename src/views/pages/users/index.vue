<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div>
              <div class="row">
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
              <div class="row no-gutters mt-2">
                <!--is loading goes to next div-->
                <!-- <h6 v-if="isLoading == false">Loading........</h6> -->
                <div
                  class="col-xl-4 col-lg-4 col-xl-3"
                  v-for="(usr, index) in usersData"
                  :key="index"
                >
                  <div class="product-box">
                    <div class="product-img">
                      <img
                        src="@/assets/images/authentication-bg.jpg"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div class="text-center">
                      <h5 class="font-size-18">
                        <a href="#" class="text-dark">{{ usr.username }}</a>
                      </h5>
                      <h6 class="mt-2 mb-0">SARprice</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { getUsers } from "@/services/api/users";
export default {
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      usersData: [],
      title: "Users",
      items: [
        {
          text: "Users",
        },
        {
          text: "List",
          active: true,
        },
      ],
    };
  },
  mounted() {
    this.returnAllUsers();
  },
  methods: {
    returnAllUsers() {
      getUsers().then((res) => {
        console.log(res);
        this.usersData = res.data;
      });
    },
  },
};
</script>
<style>
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
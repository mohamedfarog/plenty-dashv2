<template>
  <div>
    <b-modal
      id="edit-desiner-model"
      title="Edit Designer"
      hide-footer
      size="lg"
      v-model="open"
      @close="$emit('hideModal')"
    >
      <form-wizard
        color="#5664d2"
        finishButtonText="Submit"
        class="collection"
        @on-complete="editDesigners"
        step-size="sm"
      >
        <tab-content icon="fa fa-users">
          <FormulateForm
            ref="firstStep"
            name="firstStep"
            v-model="values"
            :schema="step1"
          />
        </tab-content>

        <tab-content icon="fas fa-image" class="tap2">
          <FormulateForm
            ref="secStep"
            name="secStep"
            class="step22"
            :schema="step2"
          >
            <div class="dgeeellll">
              <img
                :src="this.values.icon"
                height="55"
                width="65"
                class="dgImageChiled"
                style="margin-top: 37px"
              />
              <FormulateInput
                type="image"
                name="icon"
                class="col-12 dgChiled"
                label="Icon"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                :uploader="onFilIconSelected"
              />
            </div>
            <div class="dgeeeel2">
              <img
                :src="this.values.header_banner"
                height="60"
                width="65"
                class="dg2ImageChiled"
                style="margin-top: 37px"
              />
              <FormulateInput
                type="image"
                name="header_banner"
                class="col-12 dg2Chiled"
                label="Header Banner"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                :uploader="onHeaderBannerSelected"
              />
            </div>
            <div class="dgeeeel3">
              <img
                :src="this.values.collection_banner"
                height="60"
                width="65"
                style="margin-top: 35px"
                class="dg3ImageChiled"
              />
              <FormulateInput
                type="image"
                class="col-12 dg3Chiled"
                name="collection_banner"
                label="Collection Banner"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                :uploader="onCollBannerSelected"
              />
            </div>
          </FormulateForm>
        </tab-content>
        <tab-content id="iconId" title="Collection" icon="fas fa-image">
          <FormulateForm
            ref="thirdStep"
            name="thirdtStep"
            v-model="values"
            :schema="step3"
          >
          </FormulateForm>
          <div class="dgeeel4">
            <img
              :src="this.values.collection_image"
              height="60"
              width="65"
              style="margin-top: 35px"
            />
            <FormulateInput
              type="image"
              class="col-8 dg4Chiled"
              style="margin-left: 175px"
              name="collection_image"
              label="collection_image"
              help="Select a png, jpg or gif to upload."
              validation="mime:image/jpeg,image/png,image/gif"
              :uploader="onFileCollImageSelected"
            />
          </div>
        </tab-content>
      </form-wizard>
    </b-modal>
  </div>
</template>
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { getImagesUrls } from "@/services/api/designers";
import { editDesigner } from "@/services/api/designers";
//import Images from "../views/pages/ui/images.vue";
export default {
  components: { FormWizard, TabContent },
  props: ["openModal", "selectDesigner"],

  watch: {
    openModal(val) {
      this.open = val;
    },
    selectDesigner(val) {
      this.values = val;
      this.values.en_title = val.designer_collections.en_title;
      this.values.ar_title = val.designer_collections.ar_title;
      this.values.en_coll_desc = val.designer_collections.en_coll_desc;
      this.values.ar_coll_desc = val.designer_collections.ar_coll_desc;
      this.values.collection_image = val.designer_collections.collection_image;
    },
  },

  data() {
    return {
      open: this.openModal,
      hideModel: false,
      getImageURL: {
        iconImage: "",
        bannerImage: "",
        headerImage: "",
        collectionImage: "",
      },

      image1: "",
      values: {},
      values1: {},
      collImage: "",
      step1: [
        {
          type: "text",
          name: "en_shop_name",
          label: "English Name",
          class: "col-12",
          validation: "required",
        },
        {
          type: "text",
          name: "ar_shop_name",
          label: "Arabic Name",
          class: "col-12",
          validation: "required",
        },
        {
          type: "textarea",
          name: "en_desc",
          label: "English Description",
          class: "col-12",
          validation: "required",
        },
        {
          type: "textarea",
          name: "ar_desc",
          label: "Arabic Description",
          class: "col-12",
          validation: "required",
        },
      ],
      step2: [],
      step3: [
        {
          type: "text",
          name: "en_title",
          label: "Collection English Title",
          class: "col-12",
          validation: "required",
        },
        {
          type: "text",
          name: "ar_title",
          label: "Collection Arabic Title",
          class: "col-12",
          validation: "required",
        },
        {
          type: "textarea",
          name: "en_coll_desc",
          label: "Collection English Description",
          class: "col-12",
          validation: "required",
        },
        {
          type: "textarea",
          name: "ar_coll_desc",
          label: "Collection Arabic Description",
          class: "col-12",
          validation: "required",
        },
      ],
    };
  },
  methods: {
    onFilIconSelected(event) {
      this.uploadIconImage(event);
    },
    onHeaderBannerSelected(event) {
      this.uploadHeaderBanner(event);
    },
    onCollBannerSelected(event) {
      this.uploadCollBanner(event);
    },
    onFileCollImageSelected(event) {
      this.uploadCollImage(event);
    },

    async editDesigners() {
      var data = this.values;
      data.icon = this.getImageURL.iconImage;
      data.header_banner = this.getImageURL.bannerImage;
      data.collection_banner = this.getImageURL.headerImage;
      data.collection_image = this.getImageURL.collectionImage;
      await editDesigner(data)
        .then((res) => {
          console.log(res);
          this.makeToast(true);
          setTimeout(() => {
            this.$emit("hideModal", res.data.data);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(append = false) {
      this.$bvToast.toast(`Desiner is updated`, {
        title: "Add Designer ",
        autoHideDelay: 4000,
        appendToast: append,
        variant: "success",
        toaster: "b-toaster-top-center",
      });
    },

    async uploadIconImage(event) {
      const icon = new FormData();
      icon.append("image", event);
      await getImagesUrls(icon).then((res) => {
        this.getImageURL.iconImage = res.data;
        console.log(this.getImageURL.iconImage);
      });
    },
    async uploadHeaderBanner(event) {
      const b1 = new FormData();
      b1.append("image", event);
      await getImagesUrls(b1).then((res) => {
        this.getImageURL.bannerImage = res.data;
        console.log(this.getImageURL.bannerImage);
      });
    },
    async uploadCollBanner(event) {
      const Banner2 = new FormData();
      Banner2.append("image", event);
      await getImagesUrls(Banner2).then((res) => {
        this.getImageURL.headerImage = res.data;
        console.log(this.getImageURL.headerImage);
      });
    },
    async uploadCollImage(event) {
      const coll = new FormData();
      coll.append("image", event);
      await getImagesUrls(coll).then((res) => {
        this.getImageURL.collectionImage = res.data;
        console.log(this.getImageURL.collectionImage);
      });
    },
  },
};
</script>
<style>
.collection h4 {
  font-family: "Times New Roman", Times, serif;
}
.step22 {
  position: relative;
}

.icon-image {
  border: 1px solid;
}
.header_banner {
  border: 1px solid;
  position: absolute;
  margin-top: 115px;
  margin-left: 130px;
  border-radius: 3px;
  color: rgb(148, 144, 144);
}
.coll-banner {
  border: 1px solid;
  color: rgb(148, 144, 144);
  border-radius: 3px;
  position: absolute;
  margin-top: 250px;
  margin-left: 130px;
}

.call-image {
  border: 1px solid;
  color: rgb(148, 144, 144);
  border-radius: 3px;
  position: absolute;
  margin-top: 397px;
  margin-left: 130px;
}

.dgeeellll {
  display: flex;
}
.dgChiled {
  flex: 1;
}
.dgImageChiled {
  flex: 0, 5;
}
.dgeeeel2 {
  display: flex;
}
.dg2Chiled {
  flex: 1;
}
.dg2ImageChiled {
  flex: 0, 5;
}

.dgeeeel3 {
  display: flex;
}
.dg3Chiled {
  flex: 1;
}
.dg3ImageChiled {
  flex: 0, 5;
}
.dgeeel4 {
  display: flex;
}
.dg4Chiled {
  flex: 1;
}
</style>

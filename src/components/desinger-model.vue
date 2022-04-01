<template>
  <div>
    <b-modal id="desiner-model" title="Add Designer" hide-footer size="lg">
      <form-wizard
        color="#5664d2"
        finishButtonText="Submit"
        class="collection"
        @on-complete="addDesigner"
        @hidden="$emit('hideModal')"
        step-size="sm"
      >
        <tab-content icon="fa fa-users" :before-change="validateStep1">
          <FormulateForm
            ref="firstStep"
            name="firstStep"
            v-model="values"
            :schema="step1"
          />
        </tab-content>
        <tab-content icon="fas fa-image" :before-change="validateStep2">
          <FormulateForm
            ref="secStep"
            name="sectStep"
            v-model="values"
            :schema="step2"
          />
        </tab-content>
        <tab-content
          id="iconId"
          title="Collection"
          icon="fa fa-check"
          :before-change="validateStep3"
        >
          <FormulateForm
            ref="thirdStep"
            name="thirdtStep"
            v-model="values"
            :schema="step3"
          />
        </tab-content>
      </form-wizard>
    </b-modal>
  </div>
</template>
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { getImagesUrls } from "@/services/api/designers";
import { addNewDesigner } from "@/services/api/designers";

export default {
  components: { FormWizard, TabContent },
  data() {
    return {
      hideModel: false,
      getImageURL: {
        iconImage: "",
        bannerImage: "",
        headerImage: "",
        collectionImage: "",
      },
      values: {},
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
      step2: [
        {
          type: "image",
          name: "icon",
          label: "Icon",
          help: "Select one or more Images to upload",
          validation: "mime:image/jpeg,image/png,image/gif|required",
          uploader: this.onFilIconSelected,
        },
        {
          type: "image",
          name: "header_banner",
          label: "Header Banner",
          help: "Select one or more Images to upload",
          validation: "mime:image/jpeg,image/png,image/gif|required",
          uploader: this.onHeaderBannerSelected,
        },
        {
          type: "image",
          name: "collection_banner",
          label: "Collection Banner",
          help: "Select one or more Images to upload",
          validation: "mime:image/jpeg,image/png,image/gif",
          uploader: this.onCollBannerSelected,
        },
      ],
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
        {
          type: "image",
          name: "collection_image",
          label: "Collection Image",
          help: "Select one or more Images to upload",
          uploader: this.onFileCollImageSelected,
          validation: "mime:image/jpeg,image/png,image/gif|required",
        },
      ],
    };
  },
  methods: {
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
    validateStep2() {
      if (this.$refs["secStep"].isValid == false) {
        this.$bvToast.toast(`Please fill in all the required fields.`, {
          variant: "danger",
          position: "center",
          title: "Invild Input ",
          toaster: "b-toaster-top-center",
          autoHideDelay: 10000,
        });
      } else {
        return this.$refs["secStep"].isValid;
      }
    },
    validateStep3() {
      if (this.$refs["thirdStep"].isValid == false) {
        this.$bvToast.toast(`Please fill in all the required fields.`, {
          variant: "danger",
          position: "center",
          title: "Invild Input ",
          toaster: "b-toaster-top-center",
          autoHideDelay: 10000,
        });
      } else {
        return this.$refs["thirdStep"].isValid;
      }
    },

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

    async addDesigner() {
      var data = this.values;
      data.icon = this.getImageURL.iconImage;
      data.header_banner = this.getImageURL.bannerImage;
      data.collection_banner = this.getImageURL.headerImage;
      data.collection_image = this.getImageURL.collectionImage;
      await addNewDesigner(this.values)
        .then((res) => {
          console.log("DesingerData");
          this.$emit("hideModal", res.data.data);
          this.makeToast(true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(append = false) {
      this.$bvToast.toast(`New Designer is Added`, {
        title: "Add Designer ",
        autoHideDelay: 5000,
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
</style>
<script>
import i18n from "../i18n";

export default {
  data() {
    return {
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("@/assets/images/flags/chaina.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: "en",
    };
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/plenty/logo.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/plenty/logo.png" alt height="32" />
              <span class="nav-logo-text">lenty </span>
            </span>
          </a>

          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/plenty/logo.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/plenty/logo.png" alt height="32" />
              <span class="nav-logo-text">lenty </span>
            </span>
          </a>
        </div>

        <!-- App Search-->
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ml-2">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            id="page-header-search-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="ri-search-line"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-search-dropdown"
          >
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search ..."
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/plenty/admin.png"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1">Admin</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <div class="dg">
            <a class="dropdown-item" href="#">
              <i class="ri-user-line align-middle mr-1"></i>
              {{ $t("navbar.dropdown.kevin.list.profile") }}
            </a>
            <a class="dropdown-item" href="#">
              <i class="ri-wallet-2-line align-middle mr-1"></i>
              {{ $t("navbar.dropdown.kevin.list.mywallet") }}
            </a>
            <a class="dropdown-item d-block" href="#">
              <span class="badge badge-success float-right mt-1">11</span>
              <i class="ri-settings-2-line align-middle mr-1"></i>
              {{ $t("navbar.dropdown.kevin.list.settings") }}
            </a>
            <a class="dropdown-item" href="#">
              <i class="ri-lock-unlock-line align-middle mr-1"></i>
              {{ $t("navbar.dropdown.kevin.list.lockscreen") }}
            </a>
            <div class="dropdown-divider"></div>
            <router-link to="/logout" class="rrrr">
              <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
              {{ $t("navbar.dropdown.kevin.list.logout") }}
            </router-link>
          </div>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
.nav-logo-text {
  color: #dbddeb;
  font-size: 28px;
  font-weight: 900;
}
.logo-lg img {
  margin-top: -10px;
}
h5,
h6 {
  color: gray;
}

.dg {
  background-color: #5664d2;
  padding-right: 57%;
}

a {
  color: #fff !important;
}
.dropdown-item:hover {
  background-color: #000 !important;
}
</style>
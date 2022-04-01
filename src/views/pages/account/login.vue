<script>
import { required, email } from "vuelidate/lib/validators";
import { authMethods, notificationMethods } from "@/state/helpers";

export default {
  data() {
    return {
      email: "mohamed@dg.com",
      password: "moh1234",
      currentLoggedId: "",
      submitted: false,
      authenticating: false,
      showPassword: false,
    };
  },

  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
    password: { required },
  },

  methods: {
    ...authMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      //stop here if form is invalid

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        const { email, password } = this;
        if (email && password) {
          this.authenticating = true;
          this.logIn({ email, password })
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.user));
              localStorage.setItem("token", res.success.token);

              if (res.success.token != null) {
                this.$router.push(
                  this.$route.query.redirectFrom || { name: "home" }
                );
              } else {
                console.log("Not Authenticated");
                this.error(res.message);
              }
            })
            .catch((err) => {
              this.error = err ? err : "";
            })
            .finally(() => {
              this.authenticating = false;
            });
        }
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-6">
            <div class="authentication-bg">
              <div class="login-logo-wrapper">
                <img
                  class="mawj-logo"
                  src="@/assets/plenty/mainLogo.jpeg"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div
              class="
                authentication-page-content
                p-4
                d-flex
                align-items-center
                min-vh-100
              "
            >
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div class="login-form">
                      <div class="mb-4 text-center">
                        <img
                          class="mowj-login-logo"
                          src="@/assets/plenty/admin.png"
                          alt=""
                          srcset=""
                        />
                      </div>

                      <b-alert
                        variant="danger"
                        class=""
                        v-if="notification.message"
                        show
                        dismissible
                        >{{ notification.message }}</b-alert
                      >

                      <div class="p-1">
                        <p class="text-muted text-center">
                          Please Sign in to <strong> continue</strong>
                        </p>
                        <form
                          class="form-horizontal"
                          @submit.prevent="tryToLogIn"
                        >
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input
                              type="email"
                              v-model="email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                              :class="{
                                'is-invalid': submitted && $v.email.$error,
                              }"
                            />
                            <div
                              v-if="submitted && $v.email.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.email.required"
                                >Email is required.</span
                              >
                              <span v-if="!$v.email.email"
                                >Please enter valid email.</span
                              >
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i
                              class="ri-lock-2-line auti-custom-input-icon"
                            ></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                              :class="{
                                'is-invalid': submitted && $v.password.$error,
                              }"
                            />
                            <div
                              v-if="submitted && !$v.password.required"
                              class="invalid-feedback"
                            >
                              Password is required.
                            </div>
                          </div>

                          <div class="mt-4 text-center">
                            <button
                              class="
                                btn btn-primary
                                w-md
                                waves-effect waves-light
                                login-btn
                              "
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </form>
                        <p class="mt-4 text-center">© 2022 MVP-APPS.AE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 380px !important;
  margin: auto;
}
.login-btn {
  width: 100%;
  border-radius: 18px;
}
</style>

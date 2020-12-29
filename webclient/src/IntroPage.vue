<template>
  <div class="page">
    <div class="header layout column px-2">
      <img src="@/assets/login_text_logo.svg" class="logo my-2">
    </div>
    <user-dashboard
      v-if="userSignedIn"
      class="elevation-3"
    />
    <template v-else>
      <div class="main">
        <p class="my-3 mx-2">
          Enter the URL of an existing project to view the map
        </p>
        <img src="@/assets/map.svg" class="image my-3"/>
      </div>
      <div class="grey lighten-3 layout align-center column">
        <div class="sign-info">
          <v-layout class="column section mx-2 my-4">
            <p class="text--secondary">
              Do you wish to sign up for NapkinGIS? Please <a href="mailto:contact@napkingis.no">contact us</a> for more information.
            </p>
            <!--p class="text--secondary">
              Create a new account to publish your own maps
            </p>
            <v-btn color="primary" href="/accounts/signup/">Sign up</v-btn-->
          </v-layout>
          <div class="divider"/>
          <v-layout class="column section mx-2 my-4">
            <p class="text--secondary">
              Continue with Sign In to view your projects
            </p>
            <v-btn color="secondary" @click="showLogin=true">Sign in</v-btn>
          </v-layout>
        </div>
      </div>
    </template>
    <login-dialog
      :value="showLogin"
      :password-reset-url="app.reset_password_url"
      @login="onLogin"
      @close="showLogin = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserDashboard from '@/UserDashboard.vue'
import LoginDialog from '@/components/LoginDialog.vue'

export default {
  components: { LoginDialog, UserDashboard },
  data () {
    return {
      showLogin: false
    }
  },
  computed: {
    ...mapState(['app', 'user']),
    userSignedIn () {
      return this.user && !this.user.is_guest
    }
  },
  methods: {
    onLogin (user) {
      this.$store.commit('user', user)
      this.showLogin = false
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  min-height: 0;
  max-height: 60px;
  max-width: 50%;
  width: auto;
  object-fit: contain;
  @media (max-width: 1286px) {
    max-width: 20%;
  }
}
.page {
  min-height: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: minmax(5%, auto) 1fr auto;
  .header {
    justify-content: left;
    background-color: #505050;
  }
  .main {
    align-self: center;
    font-size: 20px;
    p {
      color: #333;
    }
  }
  .user-dashboard {
    width: 100%;
    max-width: 860px;
    justify-self: center;
    @media (min-width: 860px) {
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }
  .sign-info {
    min-width: 0;
    width: auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    .divider {
      background-color: #ddd;
      width: 1px;
      margin: 24px 4px;
    }
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
      .divider {
        width: auto;
        height: 1px;
        margin: 4px 0;
      }
    }
    .section {
      max-width: 300px;
      text-align: center;
      justify-content: space-between;
    }
    .v-btn {
      min-width: 150px;
      margin: 4px 0;
      align-self: center;
      justify-self: end;
    }
  }
}
</style>

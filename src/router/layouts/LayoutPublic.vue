
<template>
  <div class="page-content">

      <b-navbar toggleable="lg" type="light" variant="transparent  ">
         <div class="container">
            <b-navbar-brand href="#">
                <img src="/images/logo.svg" height="40px"/>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item href="#">Home</b-nav-item>
                <b-nav-item href="#">About</b-nav-item>
                <b-nav-item href="#">Categories</b-nav-item>
                

              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">

                <template v-if="!isLoggedin">
                     <b-button size="md" :to="'/signup'" variant="primary" class="" type="submit">Signup</b-button>
                     <b-button size="md" :to="'/login'" variant="primary" class="ml-2" type="submit">Login</b-button>
                </template>
                <template v-else>
                    <b-button size="md" :to="'/app/dashboard'" variant="primary" class="" type="submit">Dashboard</b-button>
                    <b-button size="md" @click="logoutUser()" variant="primary" class="" type="submit">Logout</b-button>
                </template>

              </b-navbar-nav>
            </b-collapse>
         </div>
     </b-navbar>





     <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_language: '',
    }
  },
  computed: {
      isLoggedin(){
          return this.$store.getters['user/auth/isLoggedin']
      }
  },
  watch: {
      isLoggedin(newvalue){
        return newvalue;
      }
  },
  methods: {

    async logoutUser(){
        await this.$store.dispatch('user/auth/LogOutUser')
    }
  },
  created() {




  },
  mounted(){
    const bodyClass = document.body;
    bodyClass.classList.add('public-pages');
  },
  destroyed(){
    const bodyClass = document.body;
    bodyClass.classList.remove('public-pages');

  }
}
</script>



<style lang="scss" module>
.container {
  margin: 0 auto;
}


</style>

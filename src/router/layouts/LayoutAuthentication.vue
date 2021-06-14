<template>
  <div class="authentication-layout">
      <b-navbar toggleable="lg" type="light" variant="transparent  ">
         <div class="container">
            <b-navbar-brand href="#">
                <img src="/images/logo.svg" height="40px"/>
            </b-navbar-brand>
         </div>
     </b-navbar>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {},
  created() {},
}
</script>

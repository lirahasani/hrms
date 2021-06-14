<template>
  <div id="main-content" >
       <admin-header class="my-3"></admin-header>
       <b-container fluid>
        <b-row class="text-center">
          <b-col><admin-sidebar></admin-sidebar></b-col>
          <b-col cols="9" class="mx-4 mb-5"><router-view></router-view></b-col>
        </b-row>
       </b-container>
  </div>
</template>

<script>

  import AdminHeader from '@layouts/admin/header.vue'
  import AdminSidebar from '@layouts/admin/sidebar.vue'
  export default {

    components: {
        'admin-header': AdminHeader,
        'admin-sidebar': AdminSidebar
    },


  }
</script>

<style lang="scss" scoped>

</style>

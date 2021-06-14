<template>
  <div class="sidenav">
    <b-navbar-brand href="/app/dashboard" class="my-5">
        <img src="/images/logo.svg" height="40px" />
    </b-navbar-brand>
      <b-nav vertical v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()">
        <b-nav-item :to="'/app/dashboard'" exact tag="li">Dashboard</b-nav-item>
        <b-nav-item :to="'/app/departments'" exact tag="li">Departments</b-nav-item>
        <b-nav-item :to="'/app/users'" exact tag="li">Users</b-nav-item>
        <b-nav-item :to="'/app/positions'" exact tag="li">Positions</b-nav-item>
        <b-nav-item :to="'/app/applicants'" exact tag="li">Applicants</b-nav-item>
        <b-nav-item :to="'/app/recruitments'" exact tag="li">Recruitments</b-nav-item>
        <b-nav-item :to="'/app/payrolls'" exact tag="li">Payrolls</b-nav-item>
        <b-nav-item :to="'/app/requests'" exact tag="li">Requests</b-nav-item> 
      </b-nav>

      <b-nav vertical v-else-if="user_role.name === HR_MANAGER() || user_role.name === CEO() || user_role.name === DEPARTMENT_MANAGER()">
        <b-nav-item :to="'/app/dashboard'" exact tag="li">Dashboard</b-nav-item>
        <b-nav-item :to="'/app/departments'" exact tag="li">Departments</b-nav-item>
        <b-nav-item :to="'/app/users'" exact tag="li">Users</b-nav-item>
        <b-nav-item :to="'/app/positions'" exact tag="li">Positions</b-nav-item>
        <b-nav-item :to="'/app/applicants'" exact tag="li">Applicants</b-nav-item>
        <b-nav-item :to="'/app/recruitments'" exact tag="li">Recruitments</b-nav-item>
        <b-nav-item :to="'/app/payrolls'" exact tag="li">Payrolls</b-nav-item>
        <b-nav-item :to="'/app/requests'" exact tag="li">Requests</b-nav-item>
      </b-nav>
      <b-nav vertical v-else>
          <b-nav-item :to="'/app/payrolls'" exact tag="li">Payrolls</b-nav-item>
          <b-nav-item :to="'/app/requests'" exact tag="li">Requests</b-nav-item>
      </b-nav>
  </div>
</template>

<script>
import {globalMixings} from '@/src/utils/global-mixin.js'
import EditProfileModal from '@modals/editProfileModal.vue'

export default {
    mixins: [ globalMixings ],
    components: { 
           'edit-profile-modal': EditProfileModal
    },
    computed: {
        user_profile_info(){
                return this.$store.getters['user/auth/get_user_details']
        },
    },
    watch: {
        user_profile_info(newvalue){
                return newvalue
        },
    },


     data(){
      return {}
    },
    methods:{

      async logoutUser(){
        await this.$store.dispatch('user/auth/LogOutUser')
      },
      async get_user_data(){
         let result = await this.$store.dispatch('user/auth/GET_USER_PROFILE')

      },
      openEditUserModal(id){
        this.$refs.EditProfileModal.toggleModal(id);
      }

    },
    filters:{
        capitalizeLetter(value){
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },


    created() {
        this.get_user_data();
    },

}
</script>



<style lang="scss" scoped>
.sidenav {
  background: rgb(250, 250, 250); height:100%; position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: 20rem;
  padding-top: 20px;
}

a {
  color: inherit;
}

.router-link-exact-active {
  color: #448aff;
  font-style: italic;
}
</style>

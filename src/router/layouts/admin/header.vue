
<template>
    <header>
      <b-navbar toggleable="lg" type="light" variant="transparent">
            <div class="container">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                      <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                          {{user_profile_info.first_name | capitalizeLetter }} {{ user_profile_info.last_name | capitalizeLetter}}
                        </template>
                        <b-dropdown-item :to="'/app/me'" exact tag="li">Profile</b-dropdown-item>
                        <b-dropdown-item  @click="logoutUser()">Sign Out</b-dropdown-item>
                      </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>

      <edit-profile-modal ref="EditProfileModal"/>

   </header>
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



<style lang="scss" module>

</style>

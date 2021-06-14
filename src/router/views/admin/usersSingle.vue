<template>
    <div class="page_content">

         <div class="container">

          <b-row align-v="center">

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                        <div class="hrms_breadcrumb">
                          
                            <b-breadcrumb>
                              <b-breadcrumb-item href="#home">
                              
                                Dashboard
                              </b-breadcrumb-item>
                               <b-breadcrumb-item to="''">Users</b-breadcrumb-item>
                              <b-breadcrumb-item active>{{singleUser.first_name | capitalizeLetter}}</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <!-- <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div class="hrms_actions text-right">
                              <ul>
                                <li>
                                      <b-button variant="primary">Create user</b-button>
                                </li>
                              </ul>
                          </div>
                    </div> -->
               </b-row>
         

          <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Department</td>
                          <td>Role</td>
                          <td>Email</td>
                          <td>Salary</td>

                          <td></td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>

                          <td>
                            {{singleUser.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{singleUser.last_name | capitalizeLetter }}
                          </td>
                          <td>
                            {{ singleUser.department.name | capitalizeLetter}}
                          </td>
                          <td>
                            {{ singleUser.role.name | capitalizeLetter}}
                          </td>
                          <td>
                            {{ singleUser.email }}
                          </td>
                          <td>
                            {{ singleUser.base_salary | capitalizeLetter}} USD
                          </td>
                      </tr>
                    </tbody>
          </table>
          </div>




    </div>
</template>
<script>
import { globalMixings } from '@utils/global-mixin'

export default {
  mixins: [globalMixings],
  name : "userSingle",
  components:{},
  computed: {
    singleUser(){
        return this.$store.getters['users/get_hrms_user']

      },
  },
  watch: {
    singleUser(newvalue){
                return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'User' ;
          }
      },
  },
  data(){
     return {
       back_url :''
     }
  },
  methods:{
    async get_user(){
        let user_id = this.$route.params.userId;
        await this.$store.dispatch('users/GET_HRMS_USER',user_id)

      }
  },
  created(){
    this.get_user();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>

</style>

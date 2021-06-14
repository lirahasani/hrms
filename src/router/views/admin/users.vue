<template>
    <div class="page_content">
      <div class="container">
           
                <b-row align-v="center">

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                        <div class="hrms_breadcrumb">
                            <b-breadcrumb>
                              <b-breadcrumb-item href="/app/dashboard">
                                Dashboard
                              </b-breadcrumb-item>
                              <b-breadcrumb-item active>Users</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() " class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="outline-primary" @click="openNewUserModal">Create user</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>
                

             <template v-if="users.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
               <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(users.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer;margin-right:17px" class="page-item"><a class="page-link" @click="goNext(users.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
                 <div style="margin-bottom:20px" class="form__group" >
                        <input
                        type="text"
                        v-model="search_email"
                        placeholder="Search email"
                        class="hrms_input"
                        required
                        > 
                        <select style="height:31px" class="hrms_input" v-model="department_id">
                            <option value>Select Department</option>
                            <option v-for="(department, index) in departmentList.data" :key="index" :value="department.id" >{{department.name}}</option>
                        </select>

                        <select style="height:31px" class="hrms_input" v-model="role_id">
                          <option value>Select Role</option>
                          <option v-for="(role,index) in roles_list" :key="index" :value="role.id" >{{role.name}}</option>
                        </select>
                    <b-button size="md"  @click="searchFilter()" variant="primary" class="ml-2" type="submit">Search</b-button>
                </div>
                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Department</td>
                          <td>Role</td>
                          <td style="padding-right:80px;" class="l">Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user_item, index) in users.data" :key="index">
                          <td>
                            {{user_item.first_name }}
                          </td>
                          <td>
                             {{user_item.last_name }}
                          </td>
                          <td>
                             {{user_item.department.name }}
                          </td>
                          <td>
                             {{user_item.role.name }}
                          </td>
                          
                          <template v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() ">
                              <td class="table-actions">
                                <b-button size="md"  :to="{ name: 'usersSingle', params: { userId: user_item.id}}" variant="light" class="ml-2" type="submit"><img src="/images/view.png" height="20"/></b-button>
                                <b-button size="md"  @click="openEditUserModal(user_item.id)" variant="light" class="ml-2" type="submit"><img src="/images/edit.png" height="20"/></b-button>
                                <b-button size="md" @click="deleteUser(user_item.id)" variant="light" class="ml-2" type="submit"><img src="/images/delete.png" height="20"/></b-button>
                                
                              </td>
                          </template>
                           <template v-else>
                              
                          </template>
                      </tr>
                    </tbody>
                </table>

        

             </template>
             
      </div>

        
           

      <create-new-user-modal ref="CreateNewUserModal"/>
      <edit-user-modal ref="EditUserModal"/>
    </div>

</template>
<script>
import CreateUserModal from '@modals/createNewUserModal.vue'
import EditUserModal from '@modals/editUserModal.vue'
import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'UsersPage',
  components:{
    'create-new-user-modal' : CreateUserModal,
    'edit-user-modal': EditUserModal
  },
  computed: {
      hrms_users_list(){
            this.users =  this.$store.getters['users/get_hrms_users']
      },
      roles_list(){
            return this.$store.getters['roles/get_roles']
      },
      departmentList(){
          return this.$store.getters['departments/get_department_details']
    }
  },
  watch: {
      hrms_users_list(newvalue){
              return newvalue
      },
      roles_list(newvalue){
              return newvalue
      },
      departmentList(newvalue){
              return newvalue
      },

      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Users';
          }
      },
  },
  data(){
     return {
       users : {},
       department_id:'',
       role_id : '',
       search_email : ''
     }
  },

  methods:{

      async get_hrms_users(){
         let result =  await this.$store.dispatch('users/GET_HRMS_USERS')
        
      },

      async deleteUser(id){
        var result = confirm("Want to delete?");
        if (result) {
          let result_delete =  await this.$store.dispatch('users/DELETE_USER', id)
          if(result_delete){
              await this.$store.dispatch('users/GET_HRMS_USERS')
          }else{
            alert('Cannot perform that action')
          }
        }
         
      },


   async goNext(current_page) {
      await this.$store.dispatch('users/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('users/GET_PREVIOUS_PAGE', current_page)
		},
      openNewUserModal(){
       this.$refs.CreateNewUserModal.toggleModal();
      },
      openEditUserModal(id){
        this.$refs.EditUserModal.toggleModal(id);
      },

      async searchFilter(){
          let search_string = "?email=" + this.search_email+"&department=" + this.department_id + "&role=" + this.role_id;
          let result =  await this.$store.dispatch('users/GET_USER_RESULTS', search_string)
          if(!result){
            alert('Something went wrong')
          }
      },

  },
  created(){
      this.get_hrms_users();
  
  },
  mounted(){
  },
}
</script>
<style lang="scss" scoped>
   


</style>

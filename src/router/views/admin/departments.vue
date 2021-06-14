<template>
<div class="page_content">
      <div class="container">
    
        <b-row align-v="center">
         

            <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                <div  class="hrms_breadcrumb">
                    <b-breadcrumb>
                      <b-breadcrumb-item href="/app/dashboard">
                        Dashboard
                      </b-breadcrumb-item>
                      <b-breadcrumb-item active>Departments</b-breadcrumb-item>
                    </b-breadcrumb>

              </div>
            </div>

            <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                <div v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() || user_role.name === DEPARTMENT_MANAGER()" class="hrms_actions text-right">
                      <ul>
                        <li>
                            <b-button variant="outline-primary" @click="openNewDepartmentModal">Create Department</b-button>
                        </li>
                      </ul>
                  </div>
            </div>
        </b-row>
    
      <template v-if="departments.length == 0">
        <div class="text-center mt-4 ml-4 mb-4 mr-4">
                <b-spinner label="Spinning"></b-spinner>
        </div>

      </template>
      <template v-else>
        <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer;" class="page-item"><a class="page-link" @click="goBack(departments.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer;margin-right:17px" class="page-item"><a class="page-link" @click="goNext(departments.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
        <table class="hrms_table">
            <thead>
                <tr>
                  <td>ID</td>
                  <td>Department</td>
                  <td style="padding-right:50px;" class="l">Operations</td>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(department_item, index) in departments.data" :key="index">
                  <td>
                    {{index + 1}}
                  </td>
                  <td>
                    {{department_item.name}}
                  </td>
                
                  <template v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() || user_role.name === DEPARTMENT_MANAGER()">
                      <td class="table-actions">
                        <b-button size="md"  @click="openEditDepartmentModal(department_item.id, department_item.name)" variant="light" class="ml-2" type="submit"><img src="/images/edit.png" height="20"/></b-button>
                        <b-button size="md" @click="deleteDepartment(department_item.id, department_item.name)" variant="light" class="ml-2" type="submit"><img src="/images/delete.png" height="20"/></b-button>
                      </td>
                  </template>
                    <template v-else>
                      <td class="table-actions">
                      </td>
                  </template>

              </tr>
            </tbody>
        </table>
      </template>


      </div>

      <create-new-department-modal ref="CreateNewDepartmentModal"/>
      <edit-department-modal ref="EditDepartmentModal"/>

    </div>
</template>
<script>
import CreateDepartmentModal from '@modals/createNewDepartmentModal.vue'
import EditDepartmentModal from '@modals/editDepartmentModal.vue'
import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'DepartmentPage',
  
  components:{
    'create-new-department-modal' : CreateDepartmentModal,
    'edit-department-modal': EditDepartmentModal
  },
  computed: {
      departmentList(){
        this.departments = this.$store.getters['departments/get_department_details']
      },
  },
  watch: {
      departmentList(newvalue){
              return newvalue
      },
  
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Departments';
          }
      },
    
  },
  data(){
     return {
       departments : {}
     }
  },
  methods:{

    async goNext(current_page) {
      await this.$store.dispatch('departments/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('departments/GET_PREVIOUS_PAGE', current_page)
		},


      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')

      },
      editDepartment(departmentID){
        alert(departmentID)
      },
      async deleteDepartment(id,name){
        var result = confirm("Want to delete " +name +"?");
        if (result) {
            let result_delete =  await this.$store.dispatch('departments/DELETE_DEPARTMENT', id)
            console.log(result_delete)
            if(result_delete){
               await this.$store.dispatch('departments/GET_DEPARTMENTS')
            }else{
              alert('Cannot perform that action')
            }
        }
        
      },

       openNewDepartmentModal(){
       this.$refs.CreateNewDepartmentModal.toggleModal();
      },
      openEditDepartmentModal(id, name){
       
        this.$refs.EditDepartmentModal.toggleModal(id, name);
      }

  },
  created(){
      this.get_departments();
     
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
    .departments{
        margin:0;
        padding:0;
        padding-top:40px;
        .department_item{
          display:flex;
          justify-content: space-between;
          margin-bottom:10px;
        }
    }
</style>

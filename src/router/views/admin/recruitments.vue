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
                              <b-breadcrumb-item active>Recruitments</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() " class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="outline-primary" @click="openNewRecruitmentModal">Add to Recruitment</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>

            
             <template v-if="recruitments.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(recruitments.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer; margin-right:17px" class="page-item"><a class="page-link" @click="goNext(recruitments.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Status</td>
                          <td>Notes</td>
                          <td>Position</td>
                          <td style="padding-right:50px;" class="l">Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(recruit, index) in recruitments.data" :key="index">
                          <td>
                            {{recruit.applicant.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{recruit.applicant.last_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{recruit.recruitment_status.name | capitalizeLetter }}
                          </td>
                          <td v-if="recruit.notes ===''">
                            No notes yet
                          </td>
                          <td v-else>
                              {{recruit.notes }}
                          </td>
                          <td>
                             {{recruit.applicant.position.name}}
                          </td>

                          <template v-if="user_role.name === HR_MANAGER() || user_role.name === CEO() || user_role.name === DEPARTMENT_MANAGER()">
                              <td class="table-actions">
                                 <!-- 8<b-button size="md"  :to="{ name: 'usersSingle', params: { userId: user_item.id }}" variant="info" class="ml-2" type="submit">View</b-button> -->
                                <b-button size="md"  @click="openEditUserModal(recruit.id, recruit.applicant)" variant="light" class="ml-2" type="submit"><img src="/images/edit.png" height="20"/></b-button>
                                <b-button size="md" @click="deleteRecruitment(recruit.id, recruit.applicant)" variant="light" class="ml-2" type="submit"><img src="/images/delete.png" height="20"/></b-button>
                                
                              </td>
                          </template>
                           <template v-else>
                             
                          </template>

                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-recruitment-modal ref="CreateNewRecruitmentModal"/>
      <edit-recruit-modal ref="EditRecruitmentModal"/>


    </div>

</template>
<script>
import CreateRecruitmentModal from '@modals/createNewRecruitmentModal.vue'
import EditRecruitmentModal from '@modals/editRecruitmentModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'RecruitmentsPage',
  components:{
    'create-new-recruitment-modal' : CreateRecruitmentModal,
    'edit-recruit-modal': EditRecruitmentModal
  },
  computed: {
      recruitments_list(){
        this.recruitments = this.$store.getters['recruitments/get_recruitments']
      },
  },
  watch: {
      recruitments_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Recruitments';
          }
      },
  },
  data(){
     return {
       recruitments : {}
     }
  },
  methods:{

    async goNext(current_page) {
      await this.$store.dispatch('recruitments/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('recruitments/GET_PREVIOUS_PAGE', current_page)
		},
      async get_recruitments(){
         let result =  await this.$store.dispatch('recruitments/GET_RECRUITMENTS')

      },
      async deleteRecruitment(id, applicant){
        var name = applicant.first_name.charAt(0).toUpperCase() + applicant.first_name.slice(1)
        var lastname = applicant.last_name.charAt(0).toUpperCase() + applicant.last_name.slice(1)

        var confirmation = confirm("Do you want to delete  " + name + " " + lastname);
        if(confirmation){
          let result =  await this.$store.dispatch('recruitments/DELETE_RECRUITMENT', id)
          if(result){
            await this.$store.dispatch('recruitments/GET_RECRUITMENTS')
          }else{
            alert('Cannot perform that action')
          }
        }
         

         
      },

      openNewRecruitmentModal(){
       this.$refs.CreateNewRecruitmentModal.toggleModal();
      },
      openEditUserModal(id, applicant){
       
        this.$refs.EditRecruitmentModal.toggleModal(id, applicant);
      }

  },
  created(){
      this.get_recruitments();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>

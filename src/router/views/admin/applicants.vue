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
                              <b-breadcrumb-item active>Applicants</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>
                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()" class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="outline-primary" @click="openNewApplicantModal">Register Applicant</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>
             <template v-if="applicants.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(applicants.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer;margin-right:17px;" class="page-item"><a class="page-link" @click="goNext(applicants.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
                 <!--search form here-->
                <div style="margin-bottom:20px" class="form__group" >
                        <input
                        type="text"
                        v-model="search_name"
                        placeholder="Search name"
                        class="hrms_input"
                        required
                        > 
                         <input
                        type="text"
                        v-model="search_last_name"
                        placeholder="Search last name"
                        class="hrms_input"
                        required
                        > 
                        <select style = "height:31px" class="hrms_input" v-model="position_id">
                        <option value>Select Position</option>
                        <option v-for="(position,index) in positionList.data" :key="index" :value="position.id" >{{position.name}}</option>
                    </select>
                    <b-button size="md"  @click="searchFilter()" variant="primary" class="ml-2" type="submit">Search</b-button>
                </div>
 

                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Last Name</td>
                          <td>Email</td>
                          <td>Position</td>
                          <td>Department</td>
                          <td style="padding-right:50px;" class="l">
                            Operations
                          </td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(applicant, index) in applicants.data" :key="index">
                          <td>
                            {{applicant.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.last_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.personal_email }}
                          </td>
                          <td>
                             {{applicant.position.name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.position.department.name | capitalizeLetter}}
                          </td>
                        
                          <template v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()">
                              <td class="table-actions">
                                <b-button size="md"  @click="addRecruit(applicant.id)" variant="light" class="ml-2" type="submit"><img src="/images/create.png" height="20"/></b-button>
                                <b-button size="md"  @click="openEditApplicantModal(applicant.id)" variant="light" class="ml-2" type="submit"><img src="/images/edit.png" height="20"/></b-button>
                                <b-button size="md" @click="deleteApplicant(applicant.id, applicant.first_name)" variant="light" class="ml-2" type="submit"><img src="/images/delete.png" height="20"/></b-button>
                              </td>
                          </template>
                           <template v-else>
                              
                          </template>

                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-applicant-modal ref="CreateApplicantModal"/>
      <edit-applicant-modal ref="EditApplicantModal"/>


    </div>

</template>
<script>
import CreateApplicantModal from '@modals/createNewApplicantModal.vue'
import EditApplicantModal from '@modals/editApplicantModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'Applicants',
  components:{
    'create-new-applicant-modal' : CreateApplicantModal,
    'edit-applicant-modal': EditApplicantModal
  },
  computed: {
      applicants_list(){
              this.applicants = this.$store.getters['applicants/get_applicants']
      },
       positionList(){
          return this.$store.getters['positions/get_positions']
    }
  },
  watch: {
      applicants_list(newvalue){
              return newvalue
      },
      positionList(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Applicants';
          }
      },
  },
  data(){
     return {
       applicants : {},
       search_name : '',
       search_last_name: '',
       position_id: ''
     }
  },
  methods:{

    async addRecruit(applicant_id){
        let data = {
          "status_id" : 1,
          "applicant_id" : applicant_id,
          "notes" : "Just added as a recruit"
        }
        let result = await this.$store.dispatch('recruitments/CREATE_RECRUITMENT', data)
        if(!result){
          alert("Something went wrong!")
        }else{
          alert('Succesfully added to Recruitment')
        }
    },

      async goNext(current_page) {
      await this.$store.dispatch('applicants/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('applicants/GET_PREVIOUS_PAGE', current_page)
		},


      async get_applicants(){
         let result =  await this.$store.dispatch('applicants/GET_APPLICANTS')

      },
      async deleteApplicant(id, name){
        var result = confirm("Want to delete " + name + "?");
        if (result) {
          let result_delete =  await this.$store.dispatch('applicants/DELETE_APPLICANT', id)
          if(result_delete){
            await this.$store.dispatch('applicants/GET_APPLICANTS')
          }else{
            alert('Cannot perform that action')
          }
        }

         
      },

      async searchFilter(){
          let search_string = "?first_name=" + this.search_name+"&last_name=" + this.search_last_name + "&position="+ this.position_id;
          let result =  await this.$store.dispatch('applicants/GET_APPLICANT_RESULTS', search_string)
          if(!result){
            alert('Something went wrong')
          }
      },
      
      openNewApplicantModal(){
       this.$refs.CreateApplicantModal.toggleModal();
      },
      openEditApplicantModal(id){
       
        this.$refs.EditApplicantModal.toggleModal(id);
      }

  },
  created(){
      this.get_applicants();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>

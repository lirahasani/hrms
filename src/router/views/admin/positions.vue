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
                              <b-breadcrumb-item active>Positions</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()" class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="outline-primary" @click="openNewPositionModal">Open Position</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>

             <template v-if="positions.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
               <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(positions.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer; margin-right:17px" class="page-item"><a class="page-link" @click="goNext(positions.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Department</td>
                          <td>Open Positions</td>
                          <td style="padding-right:50px;" class="l">Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(position, index) in positions.data" :key="index">
                          <td>
                            {{position.name | capitalizeLetter }}
                          </td>
                          <td>
                             {{position.department.name | capitalizeLetter }}
                          </td>
                          <td>
                             {{position.qty}}
                          </td>
                        
                          <template v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()">
                              <td class="table-actions">
                                                                <b-button size="md"  @click="openEditPositionModal(position.id)" variant="light" class="ml-2" type="submit"><img src="/images/edit.png" height="20"/></b-button>
                                <b-button size="md" @click="deletePosition(position.id, position.name)" variant="light" class="ml-2" type="submit"><img src="/images/delete.png" height="20"/></b-button>
                              </td>
                          </template>
                           <template v-else>
                            
                          </template>

                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-position-modal ref="CreateNewPositionModal"/>
      <edit-position-modal ref="EditPositionModal"/>


    </div>

</template>
<script>
import CreateNewPositionModal from '@modals/createNewPositionModal.vue'
import EditPositionModal from '@modals/editPositionModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'Positions',
  components:{
    'create-new-position-modal' : CreateNewPositionModal,
    'edit-position-modal': EditPositionModal
  },
  computed: {
      position_list(){
             // console.log(this.$store.getters['positions/get_positions'])
              this.positions = this.$store.getters['positions/get_positions']
      },
      single_position(){

      }
  },
  watch: {
      position_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Positions';
          }
      },
  },
  data(){
     return {
       positions: {}
     }
  },
  methods:{
      async get_positions(){
         let result =  await this.$store.dispatch('positions/GET_POSITIONS')

      },
      async deletePosition(id, name){
        var result = confirm("Want to delete " + name + "?");
        if (result) {
         let result_delete =  await this.$store.dispatch('positions/DELETE_POSITION', id)
         if(result_delete){
           await this.$store.dispatch('positions/GET_POSITIONS')
         }else{
           alert('Cannot perform that action')
         }
        }
         
      },

      async goNext(current_page) {
      await this.$store.dispatch('positions/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('positions/GET_PREVIOUS_PAGE', current_page)
		},
     
      openNewPositionModal(){
       this.$refs.CreateNewPositionModal.toggleModal();
      },
      openEditPositionModal(id){
        this.$refs.EditPositionModal.toggleModal(id);
      }

  },
  created(){
      this.get_positions();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>

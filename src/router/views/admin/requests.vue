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
                              <b-breadcrumb-item active>Requests</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="outline-primary" @click="openNewUserModal">Make a request</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>
                

             <template v-if="requests.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
               <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(requests.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer;margin-right:17px" class="page-item"><a class="page-link" @click="goNext(requests.next_page_url)">Next</a></li>
                  </ul>
                 </nav>
                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Details</td>
                          <td>Status</td>
                          <td>Type</td>
                          <td>Time</td>
                          <td style="padding-right:80px;" class="l">Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(request_item, index) in requests.data" :key="index">
                          <td>
                            {{request_item.user.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{request_item.user.last_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{request_item.details}}
                          </td>
                          <td>
                             {{request_item.user_request_status.name}}
                          </td>
                          <td>
                             {{request_item.user_request_type.name}}
                             
                          </td>
                          <td>
                             {{request_item.date_from | moment("dddd, MMMM Do YYYY") }} <b>TO</b> {{request_item.date_to | moment("dddd, MMMM Do YYYY")}}
                          </td>
                          
                          <template v-if="user_role.name === CEO() || user_role.name === HR_MANAGER() ">
                              <td class="table-actions">
                                <b-button size="md" @click="approveRequest(request_item.id)" variant="light" class="ml-2" type="submit"><img src="/images/confirm.png" height="20"/></b-button>
                                <b-button size="md" @click="denyRequest(request_item.id)" variant="light" class="ml-2" type="submit"><img src="/images/deny.png" height="20"/></b-button>
                              </td>
                          </template>
                           <template v-else>
                              
                          </template>
                      </tr>
                    </tbody>
                </table>

        

             </template>
             
      </div>

        
           

      <create-new-request-modal ref="CreateNewRequestModal"/>
    </div>

</template>
<script>
import CreateNewRequestModal from '@modals/createNewRequestModal.vue'
import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'UsersPage',
  components:{
    'create-new-request-modal' : CreateNewRequestModal,

  },
  computed: {
      user_requests(){
            this.requests =  this.$store.getters['requests/get_requests']
      }
  },
  watch: {
      user_requests(newvalue){
              return newvalue
      },

      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Requests';
          }
      },
  },
  data(){
     return {
       requests : {}
     }
  },

  methods:{

      async get_user_requests(){
         let result =  await this.$store.dispatch('requests/GET_REQUESTS')
      },

      async approveRequest(id){
        await this.$store.dispatch('requests/APPROVE_REQUEST', id)
        this.get_user_requests();
      },
      async denyRequest(id){
        await this.$store.dispatch('requests/DENY_REQUEST', id)
        this.get_user_requests();
      },


   async goNext(current_page) {
      await this.$store.dispatch('requests/GET_NEXT_PAGE', current_page)
    },
    
    async goBack(current_page) {
      await this.$store.dispatch('requests/GET_PREVIOUS_PAGE', current_page)
		},
      openNewUserModal(){
       this.$refs.CreateNewRequestModal.toggleModal();
      }

  },
  created(){
      this.get_user_requests();
  
  },
  mounted(){
  },
}
</script>
<style lang="scss" scoped>
   


</style>

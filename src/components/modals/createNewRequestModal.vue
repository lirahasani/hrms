<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="CreateNewRequestModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Make a request</p>
        <!-- MODAL CLOSE ICON -->
        <div class="modal-close-action" @click="hideModal">
                
        </div>
      </div>
    </template>

    <!-- MODAL BODY -->
    <template v-slot:default="{ hide }">
       
      <form  class="hrms_form">
 
            <div class="row" align-v="center">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="form__group" >
                                <div class="form__group" >
                                        <label>Type</label>
                                        <select class="hrms_input" v-model="type_id">
                                            <option value="1">vacation</option>
                                            <option value="2">long weekend</option>
                                            <option value="3">sick day</option>
                                            <option value="4">early leave</option>
                                            <option value="5">pregnancy</option>

                                        </select>
                                    
                                        <p v-show="validation.hasError('type_id')" class="error_message">
                                            <template v-if="validation.allErrors('type_id') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>
                            </div>
                    </div>
                    <!-- <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                        <div class="form__group" >
                                        <label>Status</label>
                                        <select readonly class="hrms_input" v-model="status_id">
                                            <option value="1">pending</option>
                                            <option value="2">approved</option>
                                            <option value="3">denied</option>

                                        </select>
                                    
                                        <p v-show="validation.hasError('status_id')" class="error_message">
                                            <template v-if="validation.allErrors('status_id') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>
                    </div> -->
                </div><!-- fourth row ends here-->
                <div class="row" align-v="center">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="form__group" >
                        <label>Details</label>
                            <input
                            type="text"
                            v-model="details"
                            placeholder="Details"
                            class="hrms_input"
                            required
                            >      
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form__group" >
                        <label>Date from</label>
                        <input
                                type="date"
                                v-model="date_from"
                                placeholder="Date from"
                                class="hrms_input"
                                required
                                >
                    </div>

                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form__group" >
                        <label>Date to </label>
                        <input
                                type="date"
                                v-model="date_to"
                                placeholder="Date to"
                                class="hrms_input"
                                required
                                >
                    </div>

                </div>
            </div><!--5th row ends here-->
               

      </form>
    </template>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <div class="button_item">
             <button type="button" @click="hideModal">Close</button>
      </div>
      <div class="button_item">
            <b-button
            @click="CreateUser()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Send Request</template>
                <template v-else>
                    <b-spinner small variant="white" label="Spinning"></b-spinner>
                </template>
            </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {

  name: 'CreateNewRequestModal',
  components: {
    
  },
  computed: {
    user_profile_info(){
            return this.$store.getters['user/auth/get_user_details']
        },
  //  typesList(){

  //             return this.$store.getters['departments/get_department_details']
  //     },
  //   statusList(){
  //             return this.$store.getters['roles/get_roles']

  //   }
  },

  watch: {
    user_profile_info(newvalue){
              return newvalue
      },
      // rolesList(newvalue){
      //         return newvalue
      // },

  },


   data() {
        return {
                buttonSubmitting: false,
                details:  '',
                status_id: '',
                type_id: '',
                date_from: '',
                date_to: '',
               

    }
  },
  validators: {
    status_id: function(value) {
      return this.$Validator.value(value).required()
    },
    type_id: function(value) {
      return this.$Validator.value(value).required()
    },


    
  },
  
  
  methods: {

      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')
        
      },

    async get_roles(){
         let result =  await this.$store.dispatch('roles/GET_ROLES')
        
      },
   
    hideModal() {
      this.$refs['CreateNewRequestModal'].hide()
    },
    toggleModal() {
      this.$refs['CreateNewRequestModal'].show()
    },

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    modalIsVisible() {
     
    },


    async CreateUser() {
      let validationSucceded = await this.$validate()

      console.log(validationSucceded)
    
      let data = {
                "type_id" : this.type_id,
                "user_id": this.user_profile_info.id,
                "details" : this.details,
                "date_from" : this.date_from,
                "date_to" : this.date_to,
            }

     // console.log(data);
        let result = await this.$store.dispatch('requests/CREATE_REQUEST', data)
        if(result){
                await this.$store.dispatch('requests/GET_REQUESTS')
                this.hideModal()
        }else{
            alert('Please confirm all fields , or there is a problem with api ')
        }
    },

    ChangeToDefault() {
      this.validation.reset()
    },
  },
   created(){
      // this.get_re();
      // this.get_roles();
  },

}
</script>
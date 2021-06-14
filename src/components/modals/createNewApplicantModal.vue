<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="CreateNewApplicantModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Register Applicant  </p>
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
                        <label>First name</label>
                            <input
                            type="text"
                            v-model="first_name"
                            placeholder="Name"
                            class="hrms_input"
                            required
                            > 
                            <p v-show="validation.hasError('first_name')" class="error_message">
                                <template v-if="validation.allErrors('first_name') == 'Required.'">
                                    This field is required
                                 </template>
                                </p>        
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form__group" >
                        <label>Last name</label>
                        <input
                                type="text"
                                v-model="last_name"
                                placeholder="Last Name"
                                class="hrms_input"
                                required
                                >
                        <p v-show="validation.hasError('last_name')" class="error_message">
                                <template v-if="validation.allErrors('last_name') == 'Required.'">
                                This field is required
                                </template>
                            </p>
                    </div>

                </div>
            </div><!--first row ends here-->
           
         
            <div class="row" align-v="center">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                  <div class="form__group" >
                    <label>Position</label>
                    <select class="hrms_input" v-model="position_id">
                        <option value>Select Position</option>
                        <option v-for="(position,index) in positionList.data" :key="index" :value="position.id" >{{position.name}}</option>
                    </select>
                    <p v-show="validation.hasError('position_id')" class="error_message">
                        <template v-if="validation.allErrors('position_id') == 'Required.'">
                        This field is required
                        </template>
                    </p>
                   </div>
              </div>
                </div><!-- fourth row ends here-->
                <div class="row" align-v="center">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="form__group" >
                      <label>Email</label>
                          <input
                          type="text"
                          v-model="personal_email"
                          placeholder="Email"
                          class="hrms_input"
                          required
                          > 
                          <p v-show="validation.hasError('personal_email')" class="error_message">
                            <template v-if="validation.allErrors('personal_email') == 'Required.'">
                                This field is required
                              </template>
                          </p>        
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
            @click="CreateApplicant()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Register Applicant</template>
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

  name: 'CreateNewApplicantModal',
  components: {
    
  },
  computed: {
   positionList(){
      return this.$store.getters['positions/get_positions']
    }
  
  },

  watch: {
    positionList(newvalue){
              return newvalue
      },
  },


   data() {
        return {
            buttonSubmitting: false,
            first_name : '',
            last_name : '',
            personal_email : '',
            position_id : ''
    }
  },
  validators: {
    first_name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    last_name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    personal_email: function(value) {
      return this.$Validator.value(value).required().email();
    },
    position_id: function(value) {
      return this.$Validator.value(value).required()
    },
   
  },
  
  
  methods: {

      async get_positions(){
         let result =  await this.$store.dispatch('positions/GET_POSITIONS')
        
      },
   
    hideModal() {
      this.$refs['CreateNewApplicantModal'].hide()
    },
    toggleModal() {
      //console.log()
      this.$refs['CreateNewApplicantModal'].show()
    },

    async CreateApplicant() {
      let validationSucceded = await this.$validate()
      
    
      let data = {
              "first_name": this.first_name,
              "last_name": this.last_name,
              "personal_email": this.personal_email,
              "position_id" : this.position_id,
          }

      if(validationSucceded){
            let result = await this.$store.dispatch('applicants/CREATE_APPLICANT', data)
            this.first_name = "",
            this.last_name = "",
            this.personal_email = "",
            this.position_id = ""


            if(result){
                  await this.$store.dispatch('applicants/GET_APPLICANTS')
                  this.hideModal()
            }else{
                alert('Please confirm all fields , or there is a problem with api ')
            }

          }else{alert("Fill in the fields")}
    },
  
    ChangeToDefault() {
      this.validation.reset()
    },
  },
   created(){
      this.get_positions();
      
  },

}
</script>
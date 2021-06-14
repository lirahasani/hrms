<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"

    @hide="ChangeToDefault"
    ref="EditRecruitmentModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         <p>Edit Recruit</p>
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
                        <label>Notes</label>
                            <input
                            type="text"
                            v-model="notes"
                            placeholder="Name"
                            class="hrms_input"
                            required
                            > 
                            <p v-show="validation.hasError('notes')" class="error_message">
                                <template v-if="validation.allErrors('notes') == 'Required.'">
                                    This field is required
                                 </template>
                                </p>        
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form__group" >
                    <div class="form__group" >
                        <label>Status</label>
                        <select class="hrms_input" v-model="status_id">
                            <option value>Set Status</option>
                            <option v-for="(status,index) in recruitmentStatusList" :key="index" :value="status.id" >{{status.name}}</option>
                        </select>
                    
                        <p v-show="validation.hasError('status_id')" class="error_message">
                            <template v-if="validation.allErrors('status_id') == 'Required.'">
                            This field is required
                            </template>
                        </p>
                    </div>
                  </div>
                    </div>
            </div><!--first row ends here-->
      </form>
    </template>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <div class="button_item">
             <button type="button" @click="hideModal">Close</button>
      </div>
      <div class="button_item">
            <b-button
            @click="EditRecruit()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Save</template>
                <template v-else>
                    <b-spinner small variant="white" label="Spinning"></b-spinner>
                </template>
            </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { globalMixings } from '@utils/global-mixin'

export default {
  mixins: [globalMixings],

  name: 'EditRecruitmentModal',
  components: {
    
  },
  computed: {
   recruitmentStatusList(){

              return this.$store.getters['recruitments/get_recruitment_status']
      },

      recruitment_details(){
        let recruitment  =  this.$store.getters['recruitments/get_recruitment']
        this.id = recruitment.id,
        this.status_id = recruitment.status_id,
        this.notes = recruitment.notes
        return recruitment;

      },

  },

  watch: {
    recruitmentStatusList(newvalue){
              return newvalue
      },
      recruitment_details(newvalue){
        return newvalue
      }

  },

  
   data() {
        return {
                buttonSubmitting: false,
                id: '',
                status_id: '',
                notes:'',
                applicant_id:'  '
    }
  },
  validators: {
    notes: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
   
    status_id: function(value) {
      return this.$Validator.value(value).required()
    },
 
    // password: function(value) {
    //   return this.$Validator.value(value).required();
    // },
  },
  
  
  methods: {

      async get_recruitment_status_list(){
         let result =  await this.$store.dispatch('recruitments/GET_STATUS_LIST')
        
      },
      async get_recruitment(id){
        await this.$store.dispatch('recruitments/GET_RECRUITMENT',id)

      },
  
   
    hideModal() {
      this.$refs['EditRecruitmentModal'].hide()

    },

    toggleModal(id, applicant) {
      this.$refs['EditRecruitmentModal'].show()
      this.get_recruitment(id)
      this.id = id;
      this.applicant_id = applicant.id
    },

    
    async EditRecruit() {
    let validationSucceded = await this.$validate()

        let data = {
                "id" : this.id,
                "status_id": this.status_id,
                "applicant_id" : this.applicant_id,
                "notes": this.notes
            }
        let result = await this.$store.dispatch('recruitments/EDIT_RECRUITMENT', data)

        if(result){
            this.hideModal()
            await this.$store.dispatch('recruitments/GET_RECRUITMENTS')
                
        }else{
            alert('Please confirm all fields , or there is a problem with api ')
            
        }
    },
    /**
     * * EVENT FIRED WHEN MODAL CLOSES
     */
    ChangeToDefault() {
      this.validation.reset()
    },
  },
   created(){
      this.get_recruitment_status_list();

  },

}

</script>
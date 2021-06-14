<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"

    @hide="ChangeToDefault"
    ref="EditDepartmentModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Edit Department</p>
        <!-- MODAL CLOSE ICON -->
        <div class="modal-close-action" @click="hideModal">
                
        </div>
      </div>
    </template>

    <!-- MODAL BODY -->
    <template v-slot:default="{ hide }">
       
      <form  class="hrms_form">
          <div class="row" align-v="center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="form__group" >
                    <label>Name</label>
                        <input
                        type="text"
                        v-model="name"
                        placeholder="Name here"
                        class="hrms_input"
                        required
                        > 
                        <p v-show="validation.hasError('name')" class="error_message">
                          <template v-if="validation.allErrors('name') == 'Required.'">
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
            @click="EditDepartment()"
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

  name: 'EditDepartmentModal',
  components: {
    
  },
  computed: {
   departmentList(){

              return this.$store.getters['departments/get_department_details']
      },

  },

  watch: {
  
    departmentList(newvalue){
              return newvalue
      }
      

  },

  
   data() {
        return {
                buttonSubmitting: false,
                id : '',
                name : ''
                
    }
  },
  validators: {
    name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },

  },
  
  
  methods: {

      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')
        
      },

    hideModal() {
      this.$refs['EditDepartmentModal'].hide()
    },
    toggleModal(id, dpname) {
      this.$refs['EditDepartmentModal'].show()
      this.name= dpname
      this.id = id;
    },


    async EditDepartment() {
      let validationSucceded = await this.$validate()
      //console.log(validationSucceded)
      
          let data = {
                  "id" : this.id,
                  "name" : this.name
              }

          let result = await this.$store.dispatch('departments/EDIT_DEPARTMENT', data)

          if(result){
                  await this.$store.dispatch('departments/GET_DEPARTMENTS')
                  this.hideModal()
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
      this.get_departments();
 

  },

}

</script>
<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="CreateNewDepartmentModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Add new Department  </p>
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
            @click="CreateDepartment()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Add new Department</template>
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

  name: 'CreateNewDepartmentModal',
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
      },

  },

  /**
   *
   *    ! TOMOROW I HAVE TO SAVE THE SELECTED MASTER TYPE AND MASTER PARTNER STUDIO ID AND OPEN NEW MODAL
   */
   data() {
        return {
                buttonSubmitting: false,
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

    async get_roles(){
         let result =  await this.$store.dispatch('roles/GET_ROLES')
        
      },
   
    hideModal() {
      this.$refs['CreateNewDepartmentModal'].hide()
    },
    toggleModal() {
      this.$refs['CreateNewDepartmentModal'].show()
    },

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    modalIsVisible() {
     
    },


    async CreateDepartment() {
      //console.log(validationSucceded)
    
      let data = {
              "name": this.name,
          }
      let validationSucceded = await this.$validate()
        

      //console.log(data);
      if(validationSucceded){
        let result = await this.$store.dispatch('departments/CREATE_DEPARTMENT', data)
        
        if(result){
              await this.$store.dispatch('departments/GET_DEPARTMENTS')
              this.hideModal()
              this.name = '' // after adding a new department make the input field
        }else{
            alert('Please confirm all fields , or there is a problem with api ')
        }

      }else{alert("Fill in the field")}

      
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
      this.get_roles();
  },

}
</script>
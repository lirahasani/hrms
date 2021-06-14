<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="CreateNewPositionModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Open a new Position  </p>
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
                        <label>Position name</label>
                            <input
                            type="text"
                            v-model="name"
                            placeholder="Name"
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
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                        <div class="form__group" >
                                        <label>Department</label>
                                        <select class="hrms_input" v-model="department_id">
                                            <option value>Select Department</option>
                                            <option v-for="(department, index) in departmentList.data" :key="index" :value="department.id" >{{department.name}}</option>
                                        </select>
                                    
                                        <p v-show="validation.hasError('department_id')" class="error_message">
                                            <template v-if="validation.allErrors('department_id') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>
                    </div>
            </div><!--first row ends here-->
            <div class="row" align-v="center">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form__group" >
                                <label>Open Positions</label>
                            <input
                                    type="text"
                                    v-model="qty"
                                    placeholder="Number of Open Positions"
                                    class="hrms_input"
                                    required
                                    >
                            <p v-show="validation.hasError('qty')" class="error_message">
                                    <template v-if="validation.allErrors('qty') == 'Required.'">
                                    This field is required
                                    </template>
                                </p>
                        </div>
                    </div>
                    
            </div><!--second row ends here-->
               

      </form>
    </template>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <div class="button_item">
             <button type="button" @click="hideModal">Close</button>
      </div>
      <div class="button_item">
            <b-button
            @click="CreatePosition()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Open new Position</template>
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

  name: 'CreateNewPositionModal',
  components: {
    
  },
  computed: {
   departmentList(){
      return this.$store.getters['departments/get_department_details']
    }
  
  },

  watch: {
    departmentList(newvalue){
              return newvalue
      },
  },


   data() {
        return {
            buttonSubmitting: false,
            name : '',
            department_id: '',
            qty: ''
    }
  },
  validators: {
    name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    department_id: function(value) {
      return this.$Validator.value(value).required()
    },
    qty: function(value) {
      return this.$Validator.value(value).maxLength(7).integer().required()
    },
  },
  
  
  methods: {

      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')
        
      },
   
    hideModal() {
      this.$refs['CreateNewPositionModal'].hide()
    },
    toggleModal() {
      //console.log()
      this.$refs['CreateNewPositionModal'].show()
    },

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    modalIsVisible() {
     
    },


    async CreatePosition() {
      let validationSucceded = await this.$validate()
      console.log(validationSucceded)
    
      let data = {
              "name": this.name,
              "department_id" : this.department_id,
              "qty": this.qty
          }

      if(validationSucceded){
            let result = await this.$store.dispatch('positions/CREATE_POSITION', data)
            this.name = "",
            this.department_id = "",
            this.qty = ""

            if(result){
                  await this.$store.dispatch('positions/GET_POSITIONS')
                  this.hideModal()
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
      
  },

}
</script>
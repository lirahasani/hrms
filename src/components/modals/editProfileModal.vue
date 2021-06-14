<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"

    @hide="ChangeToDefault"
    ref="EditProfileModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>View Profile</p>
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
                            readonly
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
                                readonly
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
                                <label>Base Salary</label>
                            <input
                                    type="text"
                                    v-model="base_salary"
                                    placeholder="Base Salary"
                                    class="hrms_input"
                                    readonly
                                    required
                                    >
                            <p v-show="validation.hasError('base_salary')" class="error_message">
                                    <template v-if="validation.allErrors('base_salary') == 'Required.'">
                                    This field is required
                                    </template>
                                </p>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="form__group" >
                                        <label>Street</label>
                                        <input
                                                type="text"
                                                v-model="street"
                                                placeholder="Street"
                                                class="hrms_input"
                                                readonly
                                                required
                                                >
                                        <p v-show="validation.hasError('street')" class="error_message">
                                                <template v-if="validation.allErrors('street') == 'Required.'">
                                                This field is required
                                                </template>
                                            </p>
                                    </div>
                    </div>
            </div><!--second row ends here-->
            <div class="row" align-v="center">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="form__group" >
                                <label>City</label>
                                <input
                                        type="text"
                                        v-model="city"
                                        placeholder="Ciity"
                                        class="hrms_input"
                                        readonly
                                        required
                                        >
                                <p v-show="validation.hasError('city')" class="error_message">
                                        <template v-if="validation.allErrors('city') == 'Required.'">
                                        This field is required
                                        </template>
                                    </p>
                            </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            
                                <div class="form__group" >
                                    <label>Country</label>
                                    <input
                                            type="text"
                                            v-model="country"
                                            placeholder="Country "
                                            class="hrms_input"
                                            readonly
                                            required
                                            >
                                        <p v-show="validation.hasError('country')" class="error_message">
                                            <template v-if="validation.allErrors('country') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>

                    </div>
            </div><!--third row ends here-->
            <div class="row" align-v="center">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="form__group" >
                                <div class="form__group" >
                                        <label>Department</label>
                                        <select class="hrms_input" v-model="department_id">
                                            <option value>Select department</option>
                                            <option disabled v-for="(department,index) in departmentList.data" :key="index" :value="department.id" >{{department.name}}</option>
                                        </select>
                                    
                                        <p v-show="validation.hasError('department_id')" class="error_message">
                                            <template v-if="validation.allErrors('department_id') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>
                            </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                        <div class="form__group" >
                            
                          <label>Role</label>
                          <select class="hrms_input" v-model="role_id">
                              <option value>Select Role</option>
                              <option disabled v-for="(role,index) in rolesList" :key="index" :value="role.id" >{{role.name}}</option>
                          </select>
                            
                        
                            <p v-show="validation.hasError('role_id')" class="error_message">
                                <template v-if="validation.allErrors('role_id') == 'Required.'">
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
                            type="email"
                            v-model="email"
                            placeholder="Email"
                            class="hrms_input"
                            readonly
                            required
                            > 
                            <p v-show="validation.hasError('email')" class="error_message">
                                <template v-if="validation.allErrors('email') == 'Required.'">
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
    </template>
  </b-modal>
</template>

<script>
import { globalMixings } from '@utils/global-mixin'

export default {
  mixins: [globalMixings],

  name: 'EditProfileModal',
  components: {
    
  },
  computed: {
   departmentList(){

              return this.$store.getters['departments/get_department_details']
      },

      singleUser(){
        let user  =  this.$store.getters['users/get_hrms_user']
       //console.log("useri")
       //console.log(user)
        this.id = user.id,
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.base_salary = user.base_salary,
        this.street = user.street,
        this.city = user.city,
        this.country = user.country,
        this.email = user.email,
        this.department_id = user.department.id,
        this.role_id = user.role.id,
        this.password = ''
        this.confirm_password = ''
        return user;

      },
      rolesList(){
              return this.$store.getters['roles/get_roles']

    }
  },

  watch: {
    singleUser(newvalue){
                return newvalue
      },
    departmentList(newvalue){
              return newvalue
      },
      rolesList(newvalue){
              return newvalue
      },

  },

  
   data() {
        return {
                buttonSubmitting: false,
                id: '',
                first_name: '',
                last_name:'',
                base_salary:  '',
                street:'',
                city: '',
                country: '',
                email: '',
                department_id: '',
                role_id: '',
                password: '',
                confirm_password:''
    }
  },
  validators: {
    first_name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    last_name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    base_salary: function(value) {
      return this.$Validator.value(value).maxLength(7).float()
    },
    street: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    city: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    country: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    street: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    email: function(value) {
      return this.$Validator.value(value).required().email();
    },
    department_id: function(value) {
      return this.$Validator.value(value).required()
    },
    role_id: function(value) {
      return this.$Validator.value(value).required()
    },
    // password: function(value) {
    //   return this.$Validator.value(value).required();
    // },
  },
  
  
  methods: {

      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')
        
      },
      async get_user(id){
        await this.$store.dispatch('users/GET_HRMS_USER',id)

      },

      async get_roles(){
         let result =  await this.$store.dispatch('roles/GET_ROLES')
        
      },
  
   
    hideModal() {
      this.$refs['EditProfileModal'].hide()
    },
    toggleModal(id) {
      this.$refs['EditProfileModal'].show()
      this.get_user(id)
      this.id = id;
      //console.log(id)
    },

    

  

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    //modalIsVisible() {
     
    //}

    ChangeToDefault() {
      this.validation.reset()
    },
  },
   created(){
      this.get_departments();
      this.get_user();
      this.get_roles();

  },

}

</script>
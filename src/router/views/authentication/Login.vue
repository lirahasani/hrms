<template>
    <div class="page_content">
              <div class="login_form">
                    <form  class="hrms_form">
                          <h3>Please Login</h3>
                          <p>
                             Please fill out the form below in order to access our dashboard.
                          </p>
                          <div class="form__group" >
                              <label>Email address</label>
                              <input
                                    type="text"
                                    v-model="email"
                                    placeholder="Type your email"
                                    class="hrms_input"
                                    required
                                    >
                              <div v-show="validation.firstError('email')"  class="error_message">This field is required</div>
                          </div>


                           <div class="form__group">
                              <label>Account password</label>
                              <input
                                    type="password"
                                    v-model="password"
                                    placeholder="Type your password"
                                    class="hrms_input"
                                    required
                                    >
                               <div v-show="validation.firstError('password')"  class="error_message">This field is required</div>
                          </div>


                          <div class="form_buttons text-right">
                                 <b-button  @click="LoginUser()" size="lg" variant="primary">Login</b-button>
                          </div>

                    </form>
              </div>
    </div>
</template>
<script>
export default {
  name : 'LoginForm',
  components:{},
  computed: {},
  watch: {
    $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Login';
          }
      },
  },
  validators: {
    email: function(value) {
      return this.$Validator.value(value).required().email();
    },
    password: function(value) {
      return this.$Validator.value(value).required();
    },


  },
  data(){
     return {
        email: '',
        password: ''
     }
  },
  methods:{
      async LoginUser(){


            let validationSucceded = await this.$validate()
            if(validationSucceded){
                  let data =  {
                    "email": this.email,
                    "password": this.password
                  }

           await this.$store.dispatch('user/auth/LOGIN_USER', data)
        

            }
      }

  },
  created(){},
  mounted(){},
  
}
</script>
<style lang="scss" scoped>

</style>

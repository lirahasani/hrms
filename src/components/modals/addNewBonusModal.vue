<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="AddBonusModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Generate Payroll</p>
        <!-- MODAL CLOSE ICON -->
        <div class="modal-close-action" @click="hideModal">
                
        </div>
      </div>
    </template>

    <!-- MODAL BODY -->
    <template v-slot:default="{ hide }">
       <p>If no one deserves a bonus that's ok. Just leave it empty</p>
      <form  class="hrms_form">
            <div class="row" align-v="center">
                <div class="col-12">
                    <div class="form__group" >
                      <table class="hrms_table">
                        <thead>
                            <tr>
                              <td>Employee</td>
                              <td>Bonus</td>
                              <td  class="l">
                                Operations
                              </td>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in user_payrolls" :key="index">
                              <td>
                                <select class="hrms_input" v-model="item.user_id">
                                    <option value>Select User</option>
                                    <option v-for="(user, index) in usersList.data" :key="index" :value="user.id" >{{user.first_name}}</option>
                                </select>
                              </td>
                              <td>
                                <input
                                        type="number"
                                        v-model="item.bonus"
                                        placeholder="Bonus"
                                        class="hrms_input"
                                        required
                                        >
                              <p v-show="validation.hasError('item.bonus')" class="error_message">
                                    <template v-if="validation.allErrors('item.bonus') == 'Required.'">
                                    This field is required
                                    </template>
                                </p>
                             
                              </td>
                              <template>
                                  <td class="table-actions">
                                    <b-button size="md" @click="deleteRow(index, item)" variant="danger" class="ml-2" type="submit">Delete</b-button>

                                  </td>
                              </template>
                            

                          </tr>
                        </tbody>
                    </table>
                    </div>
                    <button type='button' class="btn btn-info" @click="addNewRow">
                      <i class="fas fa-plus-circle"></i>
                      Add
                  </button>
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
            @click="GeneratePayrolls()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template>Generate Payroll</template>

            </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {

  name: 'AddBonusModal',
  components: {
    
  },
  computed: {
   usersList(){
      return this.$store.getters['users/get_hrms_users']
    }
  
  },

  watch: {
    usersList(newvalue){
              return newvalue
      },
  },

   data() {
        return {
            user_payrolls: [
              {
                user_id:'',
                bonus:''
              }
            ]
    }
  },
  validators: {

    user_id: function(value) {
      return this.$Validator.value(value).required()
    },

  },
  
  
  methods: {

    clearModalData(){
      this.user_payrolls=[]


    },

    deleteRow(index, user_bonus) {
            var idx = this.user_payrolls.indexOf(user_bonus);
            console.log(idx, index);
            if (idx > -1) {
                this.user_payrolls.splice(idx, 1);
            }
        },

    addNewRow() {
            this.user_payrolls.push(
              {
                user_id: '',
                bonus: '',
              }
            )
          },

    async get_users(){
        let result =  await this.$store.dispatch('users/GET_HRMS_USERS')
      
    },
   
    hideModal() {
      this.$refs['AddBonusModal'].hide()
      
    },
    toggleModal() {
      this.$refs['AddBonusModal'].show()
    },

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    modalIsVisible() {
     
    },


    async GeneratePayrolls() {
            let data = {
                "bonus_users": this.user_payrolls,
            }
            let result = await this.$store.dispatch('payrolls/ADD_BONUS', data)
            if(result){
                  this.hideModal()
                  
            }else{
                alert('Please confirm all fields , or there is a problem with api ')
            }

   
    },
    /**
     * * EVENT FIRED WHEN MODAL CLOSES
     */
    ChangeToDefault() {
      this.validation.reset(),
      this.clearModalData()
    },
  },
   created(){
      this.get_users();
      
  },

}
</script>
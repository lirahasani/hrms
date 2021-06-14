<template>
    <div class="page_content">

         <div class="container">

           <b-row align-v="center">

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                        <div class="hrms_breadcrumb">
                            <b-breadcrumb>
                              <b-breadcrumb-item href="#home">
                              
                                Dashboard
                              </b-breadcrumb-item>
                               <b-breadcrumb-item to="''">Department</b-breadcrumb-item>
                              <b-breadcrumb-item active></b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <!-- <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div class="hrms_actions text-right">
                              <ul>
                                <li>
                                      <b-button variant="primary">Create user</b-button>
                                </li>
                              </ul>
                          </div>
                    </div> -->
               </b-row>
         

       <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Department</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>

                          <td>
                            {{singleDepartment.name | capitalizeLetter}}
                          </td>
                    
                      </tr>
                    </tbody>
          </table>
          </div>
    </div><!--page content ends here-->

  
</template>
<script>
import { globalMixings } from '@utils/global-mixin'

export default {
  mixins: [globalMixings],
  name : "DepartmentSingle",
  components:{},
  computed: {
    singleDepartment(){
        return this.$store.getters['departments/get_department_single']
        

      },
  },
  watch: {
    singleDepartment(newvalue){
                return newvalue
      },
  },
  data(){
     return {}
  },
  methods:{
    async get_department_single(){
        let department_id = this.$route.params.departmentId;
        await this.$store.dispatch('departments/GET_DEPARTMENT_SINGLE',department_id)

      }
  },
  created(){
    this.get_department_single();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>

</style>

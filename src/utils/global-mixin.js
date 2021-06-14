export const globalMixings = {
  computed: {
      user_role(){
          return this.$store.getters['user/auth/get_user_role']
      }
  },
  watch:{
    user_role(newvalue){
      return newvalue
    }
  },
  data() {
    return {
      CEO(){
        return 'Ceo'
      },
      HR_MANAGER(){
        return 'HR Manager'
      },
      FINANCIAL_MANAGER(){
        return 'Financial Manager'
      },
      DEPARTMENT_MANAGER(){
        return 'Department Manager'
      },
      TEAM_LEADER(){
        return 'Team leader'
      },
      EMPLOYEE(){
        return 'Employee'
      },

    }
  },
  filters:{
    capitalizeLetter(value){
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {},
  created() {}

}

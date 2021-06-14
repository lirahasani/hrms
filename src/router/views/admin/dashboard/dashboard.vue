<template>
  <div>
    <div class="container">
      <div class="page_content">
        <b-row align-v="center">
          <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <div  class="hrms_breadcrumb">
                  <b-breadcrumb>
                    <b-breadcrumb-item active>Dashboard</b-breadcrumb-item>
                  </b-breadcrumb>
            </div>
          </div>
        </b-row>
      </div>
      <div class="centered">
        <p>Please click the module you want to review.</p>
        <div>
          <b-container class="bv-example-row mb-5">
            <b-row>
              <b-col class="item">
                <b-nav-item :to="'/app/departments'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="departments.length == 1">
                      Departments<br>
                      ({{ departments.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Departments<br>
                      ({{ departments.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
                <b-nav-item :to="'/app/applicants'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="departments.length == 1">
                      Applicants<br>
                      ({{ departments.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Applicants<br>
                      ({{ departments.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
              </b-col>
              <b-col>
                <b-nav-item :to="'/app/users'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="positions.length == 1">
                      Users<br>
                      ({{ positions.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Users<br>
                      ({{ positions.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
                <b-nav-item :to="'/app/recruitments'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="positions.length == 1">
                      Recruitments<br>
                      ({{ positions.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Recruitments<br>
                      ({{ positions.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
                <b-nav-item :to="'/app/requests'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="positions.length == 1">
                      Requests<br>
                      ({{ positions.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Requests<br>
                      ({{ positions.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
              </b-col>
              <b-col>
                <b-nav-item :to="'/app/positions'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="applicants.length == 1">
                      Positions<br>
                      ({{ applicants.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Positions<br>
                      ({{ applicants.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
                <b-nav-item :to="'/app/payrolls'">
                  <b-card bg-variant="light">
                    <b-card-text v-if="positions.length == 1">
                      Payrolls<br>
                      ({{ positions.length }} item)
                    </b-card-text>
                    <b-card-text v-else>
                      Payrolls<br>
                      ({{ positions.length }} items)
                    </b-card-text>
                  </b-card>
                </b-nav-item>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>

      <img src="/images/welcome.gif" style="height: 35rem;"/>
    </div>
  </div>
</template>

<script>
// import DepartmentService from '../../../services/DepartmentService'
// import PositionService from '../../../services/PositionService'
// import ApplicantService from '../../../services/ApplicantService'

export default ({
  name : 'Dashboard',
  data(){
     return {
        departments: [],
        positions: [],
        applicants: []
     }
  },
  methods : {
    // retrieveDepartments() {
    //   DepartmentService.getAll()
    //     .then(response => {
    //       this.departments = response.data;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    // retrieveApplicants() {
    //   ApplicantService.getAll()
    //     .then(response => {
    //       this.applicants = response.data;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    // retrievePositions() {
    //   PositionService.getAll()
    //     .then(response => {
    //       this.positions = response.data;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    // this.retrieveDepartments();
    // this.retrievePositions();
    // this.retrieveApplicants();
  }
})
</script>

<style>
.container {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.864);
  width: 50rem;
  margin: 25px 0;
  padding: 3rem 0 0 0;
}
</style>
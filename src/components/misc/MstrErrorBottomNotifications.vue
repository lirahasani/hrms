<template>
  <transition name="fade" v-if="notification_data.notification_visible">
    <div class="mstr-notification-bottom"
        :class="{
          'is-error': notification_data.notification_type == 'error',
          'is-success': notification_data.notification_type == 'success',
        }" >
              <div class="icon">
                    <i
                        class="mstr"
                        :class="notification_data.notification_icon">
                    </i>
              </div>
              <div class="description">
                    <h5>{{notification_data.notification_title}}</h5>
                    <p>
                        {{notification_data.notification_desc}}
                    </p>
              </div>
              <div class="close_icon" @click="closeNotification">
                    <i class="mstr mstr-icon-close-outline"></i>
              </div>
    </div>
  </transition>
</template>

<script>
  export default {
      computed: {
          notification_data(){
            return this.$store.getters['mstr/get_notification_data']
          }
      },
      watch:{
        notification_data(newvalue){
          return newvalue;
        }
      },
      methods: {
          reject(){
              this.$emit('reject', this.confirmDialogFor)
          },
          accept(){
              this.$emit('accept', this.confirmDialogFor)
          },
          closeNotification(){
            this.$store.dispatch('mstr/CLOSE_NOTIFICATION')
          }
      },
      created(){

      }
  }
</script>

<style lang="scss" scoped>
    .fade-enter-active,
    .fade-leave-active {
            transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

  .mstr-notification-bottom {




        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 99999;
        min-width: 340px;

        max-width: 430px;
        background: #fff;
        padding: 20px;
        border-radius: 13px;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.04), 0px 2px 20px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 20px rgba(0, 0, 0, 0.06);

        .icon{
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 17px;
          margin-bottom: 20px;
          text-align: center;
          i{
                font-size: 17px;
                line-height: 30px;

          }
        }
        .description{
                  width: 73%;
              h5{
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 10px;
              }
              p{
                    font-size: 14px;
                    line-height: 22px;
                    color: #3f3f3f;
              }
        }
        .close_icon{
          width: 10%;
          text-align: center;
          i{
                font-size: 20px;
                cursor:pointer;
          }
        }

        &.is-error{
              .icon{
                 background: rgba(255, 29, 13, 0.08);
                 i{
                    color: #ff1d0d;
                 }
              }
        }
        &.is-success{
              .icon{
                 background: rgba(50, 201, 84, 0.12);
                 i{
                    color:#32C954;;
                 }
              }
        }








}
</style>

<template>
  <div class="page_content">
       
       <div class="row">
          <div class="container">
              <h2> {{message}}</h2>
          </div>
       </div>
       
    
  </div>


</template>

<script>
import appConfig from '@src/app.config'
export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  data() {
    return {
          message: 'Hello from Homepage'
    }
  }

}
</script>



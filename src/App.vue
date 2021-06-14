<template>
  <div id="app">
    <RouterView />
    
  </div>
</template>

<script>
//import appConfig from '@src/app.config'
export default {
name: 'App',
//  metaInfo: {
//     title: 'Default App Title',
//     titleTemplate: '%s | vue-meta Example App',

//   },

 
}
</script>
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

#nprogress .bar {
  background: #000;
}


</style>

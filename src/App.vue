<template>
  <div id="app">
    <!--刻度表-->
    <ruler @post-NumValue="rulerNum" :NowNum='100' :maxNum='2000' :minNum='0' :ruleWidth='40' :numSize='50'></ruler>
  </div>
</template>

<script>

import ruler from './page/ruler.vue'
  export default {
    name: 'App',
    data() {
      return {
        NumValue: '',
        color: 'red'
      }
    },
    methods: {
      //子组件传递刻度表
      rulerNum(vul){
        this.NumValue = vul
        // console.log(vul)
      },
    },
    computed: {

    },
    created() {
      
    },
    mounted() {

    },
    components: {
      ruler
    }
  }
</script>

<style type="text/css">
	
</style>

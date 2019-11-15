<template>
  <div id="app">
    <!--刻度表-->
    <!-- <ruler @post-NumValue="rulerNum" @scroll-end="endEvent" :NowNum='100' :maxNum='400' :minNum='340' :ruleWidth='40' pointerColor="yellow" :numSize='50' ispoint></ruler> -->
    
    <ruler @post-NumValue="rulerNum" @scroll-start='startEvent' @scroll-end="endEvent" :NowNum='100' :maxNum='200' :minNum='0' :ruleWidth='40' :numSize='50'></ruler>
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
      endEvent(val){
        console.log(val)
      },
      startEvent(val){
        // console.log(val)
      }
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
	* {
	  margin: 0;
	  padding: 0;
	  box-sizing: border-box; 
	}
</style>

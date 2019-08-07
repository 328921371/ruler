<template>
  <div id="app">
    <ruler @post-NumValue="rulerNum" :NowNum='NowNum' :maxNum='2000' :minNum='0'></ruler>
  </div>
</template>

<script>
import ruler from "./page/ruler";
export default {
    name: 'app',
    props: {
      NowNum: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        NumValue: ''
      }
    },
    methods: {
      //子组件传递刻度表
      rulerNum(vul){
        this.NumValue = vul
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

<style>

</style>

<template>
  <div>
    <div class="rule">
      <!--刻度表-->
      <div class="scrollrule" ref="scrollrule">
        <ul class="scrollrule-hook">
          <!--0刻度前的空白-->
          <div class="rule-null">
            <li v-for="(item,index) in zeroList" class="scroll-item" :key="index"></li>
          </div>
          <!--正常刻度表-->
          <template v-for="(item,index) in counter">
            <li class="scroll-item" :key="index">
              <template v-if="index % 10 == 0">
                <div class="scroll-item-rule vux-1px-l scale-integer"></div>
                <div v-if="ispoint" class="scroll-item-num">{{ (index + minNum) / 10 }}</div>
                <div v-else class="scroll-item-num">{{ index + minNum }}</div>
              </template>
              <template v-else-if="index % 5 == 0">
                <div class="scroll-item-rule vux-1px-l scale-half"></div>
              </template>
              <template v-else>
                <div class="scroll-item-rule vux-1px-l scale-one"></div>
              </template>
            </li>
          </template>
          
          <!-- 最大刻度后面的空白 -->
          <div class="rule-null-after">
            <li v-for="(item,index) in aletrList" class="scroll-item" :key="index"></li>
          </div>
          
        </ul>
      </div>
      <!--刻度表的针-->
      <div class="scroll-item-pointer"></div>

    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'cs-ruler',
    props: {
      // 初始值
      NowNum: {
        type: Number,
        default: 100
      },
      // 最大刻度
      maxNum: {
        type: Number,
        default: 1000
      },
      // 最小刻度
      minNum: {
        type: Number,
        default: 0
      },
      // 指针颜色
      pointerColor: {
        type: String,
        default: 'rgb(97,206,81)'
      },
      // 刻度尺有多细
      ruleWidth: {
        type: Number,
        default: 40
      },
      // 字体大小
      numSize: {
        type: Number,
        default: 50
      },
      // 是否启用小数
      ispoint: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 由于v-for循环的时候,按照index计数的,所以最后一个值不会显示,需要+1,则刻度尺后面的空白就要+1
        counter: this.maxNum - this.minNum + 1,
        //0刻度前面的空白,
        zeroList: this.ruleWidth / 2,
        // 刻度结束后的空白
        aletrList: this.ruleWidth / 2 - 1,
      }
    },
    methods: {
      // 初始化滚动
      initScroll() {
        this.scrollrule = new BScroll(this.$refs.scrollrule, {
          // 实时监听滚动的位置并返回
          probeType: 3,
          scrollX: true,
        })

        // 监听滚动
        this.scrollrule.on('scroll', (pos) => {
          this.scrollX = Math.abs(Math.round(pos.x))
          let NumValue = Math.abs(Math.round(this.scrollX / this.oneWidth)) + this.minNum
          // 判断是否开启小数
          if(this.ispoint){
            this.$emit('post-NumValue', NumValue / 10)
          }else{
            this.$emit('post-NumValue', NumValue)
          }
          //假如值快接近最大的,继续加,后面再考虑
        })

        //滚动结束监听
        this.scrollrule.on('scrollEnd', (pos) => {
          //滑动后的小距离
          let littleNum = this.scrollX % this.oneWidth
          //计算距离下一个刻度的差值
          let vul = this.oneWidth - littleNum
          // 加入差值比较大,再进行吸附,大于一半的距离,就往右边吸附差值的距离,小于一半的距离,就往左边吸附滑动的距离
          if (vul > 0.5 && vul < (this.oneWidth - 0.5)) {
            if (littleNum > (this.oneWidth / 2)) {
              this.scrollrule.scrollBy(-vul, 0, 0)
            } else {
              this.scrollrule.scrollBy(littleNum, 0, 0)
            }
          }
        })

      },
      // 获取宽度用于计算滚动区域
      calculateWidth() {
        // 获取右侧菜单每一个的li
        let goodsList = this.$refs.scrollrule.getElementsByClassName('scrollrule-hook')[0]
        let listWidth = goodsList.clientWidth
        let listNum = this.counter + this.zeroList + this.aletrList
        // 每一格的距离大小
        this.oneWidth = listWidth / listNum
      },
      // 获取指针颜色等信息
      getMainValue(){
        const docStyle = document.documentElement.getElementsByClassName('rule')[0].style;
        // 指针颜色
        docStyle.setProperty('--pointer-color', this.pointerColor);
        // 字体大小
        docStyle.setProperty('--num-size', this.numSize);
        // 刻度尺宽度
        docStyle.setProperty('--rule-width', this.ruleWidth);
        
      }
    },
    computed: {

    },
    created() {
      this.$nextTick(() => {
        this.initScroll();
        this.calculateWidth();
        this.scrollrule.scrollBy(-(this.oneWidth * this.NowNum), 0, 0)
      });
    },
    mounted() {
      this.getMainValue()
    },
    components: {

    },
    watch: {

    }
  }
</script>

<style lang="less">
  .setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .setBottomLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid @c;
    color: @c;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }

  .setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }

  .setRightLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid @c;
    color: @c;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }


  .setLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    border: 1px solid @c;
    color: @c;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
  }

  .vux-1px,
  .vux-1px-t,
  .vux-1px-b,
  .vux-1px-tb,
  .vux-1px-l,
  .vux-1px-r {
    position: relative;
  }

  .vux-1px {
    &:before {
      .setLine();
    }
  }

  .vux-1px-t {
    &:before {
      .setTopLine();
    }
  }

  .vux-1px-b {
    &:after {
      .setBottomLine();
    }
  }

  .vux-1px-tb {
    &:before {
      .setTopLine();
    }

    &:after {
      .setBottomLine();
    }
  }

  .vux-1px-l {
    &:before {
      .setLeftLine();
    }
  }

  .vux-1px-r {
    &:after {
      .setRightLine();
    }
  }
</style>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }
  .rule {
    position: relative;
    width: 100vw;
    height: calc(260 / 750 * 100vw);
    overflow: hidden;
    --pointer-color: rgb(97,206,81);
    --rule-width: 40;
    --num-size: 50
  }
  
  .scrollrule {
    height: calc(200 / 750 * 100vw);
  }
  
  ul {
    list-style: none;
    overflow: hidden;
    border-collapse: collapse;
    white-space: nowrap;
    display: inline-block;
  }
  
  .scroll-item {
    display: inline-block;
    width: calc(100vw / var(--rule-width));
    text-align: center;
    vertical-align: top;
  }
  
  /*刻度表数字*/
  .scroll-item-num {
    width: calc(100 / 750 * 100vw);
    margin-left: calc(-50 / 750 * 100vw);
    margin-top: calc(38 / 750 * 100vw);
    text-align: center;
    font-size: calc(var(--num-size) / 750 * 100vw);
    color: #cccccc;
  }
  
  /*中间红色指针*/
  .scroll-item-pointer {
    position: absolute;
    top: 0;
    left: 50%;
    height: calc(70 / 750 * 100vw);
    transform: translate(-50%, 0);
    border-right: 0.5vw solid var(--pointer-color);
  }
  
  .scroll-item-rule {
    display: inline-block;
    width: calc(100vw / 40);
    box-sizing: border-box;
  }
  
  .vux-1px-l[data-v-db07d170]:before {
    border-color: #000000 !important;
  }
  
  .vux-1px-l:before {
    border-color: #000000 !important;
  }
  
  /*刻度1的*/
  .scale-one {
    height: calc(30 / 750 * 100vw);
  }
  
  /*刻度0.5的*/
  .scale-half {
    height: calc(44 / 750 * 100vw);
  }
  
  /*刻度10的*/
  .scale-integer {
    height: calc(60 / 750 * 100vw);
  }
  
  /*0刻度前面的空白*/
  .rule-null {
    margin-right: calc(-8 / 750 * 100vw);
    display: inline-block;
  }
  .rule-null-after {
    margin-left: calc(-8 / 750 * 100vw);
    display: inline-block;
  }
</style>

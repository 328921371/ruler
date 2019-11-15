## 一个简单的刻度尺

![刻度尺图片](https://raw.githubusercontent.com/328921371/MyImage/master/ruler.png)

### 项目有一个刻度尺的组件,上百度翻了许久,没有找到一个满意的,就自己动手撸了一个并上传到npm,有什么建议和不足的欢迎大家提出

## 导入

> npm install cs-ruler

## 全局引入

在 main.js 中引入

```
  import CsRuler from 'cs-ruler'
  Vue.use(CsRuler)
```

在.vue文件中使用

```
  <cs-ruler></cs-ruler>
```

> `注意` 这里的组件名称为 cs-ruler,不能替换为其他的

## 局部引入

如果想要在单个文件中引入,也可以的

在.vue中引入

` import ruler from 'cs-ruler' `

在components中注册组件

```
  components: {
    'cs-ruler': ruler.CsingRuler
  }
```

之后就可以使用了

```
  <cs-ruler></cs-ruler>
```

## 可配置项

`<cs-ruler @post-NumValue="rulerNum" :NowNum='100' :maxNum='2000' :minNum='0'></cs-ruler>`

> rulerNum 是一个函数,需要一个值去接收

```
methods: {
    //子组件传递刻度表
    rulerNum(value){
      this.NumValue = value
    },
  },
```

1. 使用@post-NumValue来接收滚动的值
2. NowNum为初始值,默认为100,可不传
3. maxNum为刻度尺的最大值,默认为1000,可不传
4. minNum为刻度的最小值,默认为0,可不传
5. 可配置小数
6. 可配置一页显示多少格,目前一页为40个小格
7. 主题颜色
8. 配置字体大小以及刻度值的显示

### 2.0.0版本新增

>新增可配置指针颜色

`<cs-ruler :pointerColor="'red'"></cs-ruler>`

>新增配置字体大小

`<cs-ruler :numSize='40'></cs-ruler>`

字体颜色直接修改相应的class名即可,如果有需求想要配置可以提出

>新增配置格数

可配置一页显示多少格,默认一页为40个小格,最低30个小格,数字为10的倍数,格数太低没有适配,有需求可以提出来

`<cs-ruler :ruleWidth='40'></cs-ruler>`

>新增配置小数

可开启小数,整体除以10,默认不开启(最大值与最小值需要相应的变大10倍)

`<cs-ruler ispoint></cs-ruler>`

### 2.0.2版本修改

修改最大值无法选中..已修复


### 2.1.0版本修改

1. 修复样式影响到其他页面问题
2. 修复同时使用多个组件,配置无效问题
3. 新增滚动结束后发送给父级消息事件,具体使用方法如下

`<cs-ruler @scroll-end="endEvent"></cs-ruler>`

在方法中监听scroll-end传递的值,值为true,则滚动完成

```
methods: {
  //子组件结束传值true
  endEvent(val){
    console.log(val)
  }
},
```

4. 新增开始滚动后发送给父级消息事件,具体使用方法如下

`<cs-ruler @scroll-start="startEvent"></cs-ruler>`

在方法中监听scroll-start传递的值,值为true,则滚动完成

```
methods: {
  startEvent(val){
    console.log(val)
  }
},

喜欢的话欢迎到github上star并且提出自己的需求
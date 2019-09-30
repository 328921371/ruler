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

`<ruler @post-NumValue="rulerNum" :NowNum='NowNum' :maxNum='2000' :minNum='0'></ruler>`

1. 使用@post-NumValue来接收滚动的值
2. NowNum为初始值,默认为100,可不传
3. maxNum为刻度尺的最大值,默认为1000,可不传
4. minNum为刻度的最小值,默认为0,可不传

目前为简单的这些配置项,基本满足我个人项目的需求,后期会添加

1. 可配置小数 (完成)
2. 可配置一页显示多少格,目前一页为40个小格 (完成)
3. 主题颜色 (完成)
4. 配置字体大小以及刻度值的显示 (完成)

### 2.0.0版本新增

>新增可配置指针颜色

`<ruler :pointerColor="'red'"></ruler>`

>新增配置字体大小

`<ruler :numSize='40'></ruler>`

字体颜色直接修改相应的class名即可,如果有需求想要配置可以提出

>新增配置格数

可配置一页显示多少格,默认一页为40个小格

`<ruler :ruleWidth='40'></ruler>`

>新增配置小数

可开启小数,整体除以10,默认不开启

`<ruler ispoint></ruler>`

2.0.0版本后期可能新增无限滚动

喜欢的话欢迎到github上star并且提出自己的需求
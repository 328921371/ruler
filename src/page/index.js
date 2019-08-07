// 引入组件
import CsingRuler from './ruler.vue'

CsingRuler.install = Vue => Vue.component(CsingRuler.name, CsingRuler);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CsingRuler);
}

export default CsingRuler
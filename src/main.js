import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// const myPlugin = (Vue) => {}
// const myPlugin = { install(Vue){}}
// this.$options - whole options

const RulesPlugin = (Vue) => {

  Vue.mixin({
    created(){
      if(this.$options.hasOwnProperty('rules')){
        const rules = this.$options.rules;

        Object.keys(rules).forEach(key => {                    
          const rule = rules[key];
          this.$watch(key, newValue => {  
            const result = rule.validate(newValue)
            if (!result) {
              console.log(rule.message)
            }
          });
        })
      }

    }
  })

}

Vue.use(RulesPlugin);

const vm = new Vue({
  data: {foo: 10},
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater then one'
    }
  },
  render: h => h(App)
}).$mount('#app')

vm.foo = -3;

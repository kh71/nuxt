import Vue from 'vue'
import WpJson from '@vue-wordpress/core'
import * as vuex from '@vue-wordpress/core/plugin/initializers/store'
import registerPlugin from '@vue-wordpress/core/plugin/registerPlugin'

export default async (ctx, inject) => {
  const options = <%= serialize(options) %>;

  vuex.registerModules(ctx.store)

  Vue.use(WpJson, {
    ...options,
    plugins: []
  })

  if (options.plugins) {
    if(Array.isArray(options.plugins)) {
      for (let plugin of options.plugins) {
        registerPlugin(Vue, plugin, ctx.store)
      }
    } else if (typeof options.plugins === 'string') {
      registerPlugin(Vue, options.plugins, ctx.store)
    }
  }
  
  await vuex.loadBase(ctx.store.dispatch, options.menus) // menus
  vuex.setConfig(ctx.store.commit, {
    ...options,
    asyncData: true
  }) 

  
}

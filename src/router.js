import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/views/Overview'

Vue.use(Router)
export const routes = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
    meta: {
      auth: true,
      hideNav: false,
      title: 'Overview'
    }
  }

]
const router = new Router({
  routes
})
router.beforeEach(async (to, from, next) => {
  return next()
})
export default router

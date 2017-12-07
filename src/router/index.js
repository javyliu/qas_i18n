import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import ListQas from '@/components/list_qas';
import Cates from '@/components/cates';
import NewTicket from '@/components/new_ticket';
const QaCates = require('@/data/cates.json');

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { cates: QaCates }
    },
    {
      path: '/cates',
      component: Cates,
      props: { cates: QaCates },
      children: [
        { path: 'list_qas/:cate_id', component: ListQas }
      ]
    },
    {
      path: 'new_ticket',
      name: 'new_ticket',
      component: NewTicket
    }
  ]
});

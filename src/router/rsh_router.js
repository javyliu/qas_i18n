import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
// import ListQas from '@/components/list_qas';
// import Cates from '@/components/cates';
// import NewTicket from '@/components/new_ticket';
// import MyTickets from '@/components/my_tickets';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
    // {
    //   path: '/cates',
    //   component: Cates,
    //   children: [
    //     {
    //       name: 'list_qas',
    //       path: 'list_qas/:cate_id',
    //       component: ListQas
    //     }
    //   ]
    // },
    // {
    //   path: '/new_ticket',
    //   name: 'new_ticket',
    //   component: NewTicket
    // },
    // {
    //   path: '/my_tickets',
    //   name: 'my_tickets',
    //   component: MyTickets
    // }
  ]
});

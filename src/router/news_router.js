import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/news/list';
import NewsDetail from '@/components/news/news_detail';
import Activity from '@/components/news/activity';

Vue.use(Router);

// console.log($vm);
export default new Router({
  mode: 'history',
  base: '/news',
  routes: [
    {
      path: '/',
      name: 'home',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'news_detail',
      component: NewsDetail,
      props: true
    },
    {
      path: '/acts/:id',
      name: 'activity',
      component: Activity,
      props: true
    }
  ]
});

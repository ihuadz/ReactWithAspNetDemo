import { Menu } from '@/types/menu';

const menuData: Menu[] = [
  {
    id: 1,
    title: 'Home',
    newTab: false,
    path: '/solid',
  },
  {
    id: 2,
    title: 'Features',
    newTab: false,
    path: '/solid/#features',
  },
  {
    id: 2.1,
    title: 'Blog',
    newTab: false,
    path: '/solid/blog',
  },
  {
    id: 2.3,
    title: 'Docs',
    newTab: false,
    path: '/solid/docs',
  },
  {
    id: 3,
    title: 'Pages',
    newTab: false,
    submenu: [
      {
        id: 31,
        title: 'Blog Grid',
        newTab: false,
        path: '/solid/blog',
      },
      {
        id: 34,
        title: 'Sign In',
        newTab: false,
        path: '/solid/signin',
      },
      {
        id: 35,
        title: 'Sign Up',
        newTab: false,
        path: '/solid/signup',
      },
      {
        id: 35,
        title: 'Docs',
        newTab: false,
        path: '/solid/docs',
      },
      {
        id: 35.1,
        title: 'Support',
        newTab: false,
        path: '/solid/support',
      },
      {
        id: 36,
        title: '404',
        newTab: false,
        path: '/solid/error',
      },
    ],
  },
  {
    id: 4,
    title: 'Support',
    newTab: false,
    path: '/solid/support',
  },
  {
    id: 5,
    title: 'Users',
    newTab: false,
    path: '/solid/users',
  },
];

export default menuData;

import { lazy } from 'react';

export const pages = [
    {
        component: lazy(() => import('../pages/index')),
        title: 'Home',
        path: '/',
    },
    {
        component: lazy(() => import('../pages/about')),
        title: 'About',
        path: '/about',
    },
    {
        component: lazy(() => import('../pages/about')),
        title: 'Sign-In',
        path: '/about',
    },
    {
        component: lazy(() => import('../pages/about')),
        title: 'Sign-In',
        path: '/about',
    },
    {
        component: lazy(() => import('../pages/about')),
        title: 'Contact Us',
        path: '/about',
    },
];

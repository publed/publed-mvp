import { lazy } from 'react';

export const pages = [
    {
        component: lazy(() => import('../pages/home')),
        title: 'Home',
        path: '/',
    },
    {
        component: lazy(() => import('../pages/about')),
        title: 'About',
        path: '/about',
    },
    {
        component: lazy(() => import('../pages/signin')),
        title: 'Sign-In',
        path: '/signin',
    },
    {
        component: lazy(() => import('../pages/signup')),
        title: 'Sign-Up',
        path: '/signup',
    },
    {
        component: lazy(() => import('../pages/contact')),
        title: 'Contact Us',
        path: '/contact',
    },
];

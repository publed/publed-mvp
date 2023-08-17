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
        component: lazy(() => import('../pages/explore')),
        title: 'Explore',
        path: '/explore',
    },
    {
        component: lazy(() => import('../pages/research')),
        title: 'Research',
        path: '/research/:name',
    },
    {
        component: lazy(() => import('../pages/review')),
        title: 'Review',
        path: '/review',
    },
    {
        component: lazy(() => import('../pages/upload')),
        title: 'Upload',
        path: '/upload',
    },
    {
        component: lazy(() => import('../pages/contact')),
        title: 'Contact Us',
        path: '/contact',
    },
    {
        component: lazy(() => import('../pages/backoffice')),
        title: 'Back Office',
        path: '/backoffice',
    },
];

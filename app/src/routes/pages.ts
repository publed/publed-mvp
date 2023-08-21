import { lazy } from 'react';

export const pages = [
    {
        component: lazy(() => import('../pages/signin')),
        title: 'Sign-In',
        path: '/signin',
    },
    {
        component: lazy(() => import('../pages/signup')),
        title: 'Sign-Up',
        path: '/',
    },
    {
        component: lazy(() => import('../pages/explore')),
        title: 'Explore',
        path: '/explore',
    },
    {
        component: lazy(() => import('../pages/research')),
        title: 'Research',
        path: '/research/:address',
    },
    {
        component: lazy(() => import('../pages/reviewAssignments')),
        title: 'Assignment',
        path: '/reviewAssignments',
    },
    {
        component: lazy(() => import('../pages/subscription')),
        title: 'Subscription',
        path: '/subscription',
    },
    {
        component: lazy(() => import('../pages/profile')),
        title: 'Profile',
        path: '/profile',
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
];

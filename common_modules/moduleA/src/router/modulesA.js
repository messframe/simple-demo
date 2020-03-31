export default [
    {
        path: '/moduleA',
        name: 'demo',
        component: () => import('../pages/demo.vue'),
    },
    {
        path: '/moduleA/home',
        name: 'homePage',
        component: () => import('../pages/home.vue'),
        children: [
            {
                path: '/moduleA/home/subHome',
                name: 'subHomePage',
                component: () => import('../pages/subHome.vue'),
            }
        ]
    },
    {
        path: '/moduleA/about',
        name: 'about',
        component: () => import('../pages/about.vue'),
    }
]
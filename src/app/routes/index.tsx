import { createBrowserRouter } from 'react-router';
import { IndexPage } from 'src/pages/indexPage';
import { Layout } from '../layout';
import { AuthNeeded } from './authNeeded';
import React from 'react';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          path: '/',
          Component: IndexPage,
        },
        {
          path: 'cart',
          lazy: async () => {
            const { CartPage: Component } = await import('src/pages/cartPage');
            return { Component };
          },
        },
        {
          path: 'me',
          lazy: async () => {
            const { ProfilePage: Component } = await import('src/pages/profilePage');
            return {
              Component: () => (
                <AuthNeeded>
                  <Component />
                </AuthNeeded>
              ),
            };
          },
        },
      ],
    },
  ],
  { basename: process.env.REACT_APP_BASE_PATH }
);

import { RouteObject } from 'react-router';
import { AuthNeeded } from './authNeeded';
import React from 'react';
import { LayoutAdmin } from '../layout/admin';
import { CategoriesList } from 'src/widgets/categoriesList';

export const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    Component: LayoutAdmin,
    children: [
      {
        path: '',
        lazy: async () => {
          const { AdminPage: Component } = await import('src/pages/admin');
          return {
            Component: () => (
              <AuthNeeded>
                <Component />
              </AuthNeeded>
            ),
          };
        },
      },
      {
        path: 'add-product',
        lazy: async () => {
          const { AddProductPage: Component } = await import('src/pages/addProductPage');
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
  {
    path: 'admin',
    Component: () => <LayoutAdmin sidebarContent={<CategoriesList />} />,
    children: [
      {
        path: 'add-category',
        lazy: async () => {
          const { AddCategoryPage: Component } = await import('src/pages/addCategoryPage');
          return {
            Component: () => (
              <AuthNeeded>
                <Component />
              </AuthNeeded>
            ),
          };
        },
      },
      {
        path: 'category/:categoryId',
        lazy: async () => {
          const { EditCategoryPage: Component } = await import('src/pages/editCategoryPage');
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
];

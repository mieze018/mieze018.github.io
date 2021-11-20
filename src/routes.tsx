import React from 'react';
import { Navigate } from 'react-router-dom';
// import DashboardLayout from 'layouts/DashboardLayout';
import MainLayout from 'layouts/MainLayout';
import NotFoundView from 'views/errors/NotFoundView';

import IndexView from 'views/Index';
import CommissionView from 'views/Commission';

//using:ページ定義
//"View"で終わってる必要がある
//
export const urls = {
  root: {
    index: {
      path: '',
      element: <IndexView />,
      title: ' '
    },
    Commission: {
      path: 'Commission',
      element: <CommissionView />,
      title: 'Commission'
    },
    NotFound: { path: '404', element: <NotFoundView /> }
  }
};

//memo:ts keyof typeof で辞書のキーから作れる オブジェクトのflattenは諦め
export function GetUrl(
  key: [key0: keyof typeof urls, key1: keyof typeof urls.root]
): string {
  return `/${[urls[key[0]][key[1]].path]}/`;
}
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...Object.entries(urls.root).map(([key, value]) => value),

      { path: '/', element: <Navigate to={GetUrl(['root', 'index'])} /> },
      { path: '*', element: <Navigate to={GetUrl(['root', 'NotFound'])} /> }
    ]
  }
];

export default routes;

import { Navigate } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import IndexView from 'views/Index';
// import CommissionedWorkView from 'views/CommissionedWork';
// import PersonalWorkView from 'views/PersonalWorkView';
//"View"で終わってる必要がある
export const urls: {
  [key: string]: {
    [key: string]: { path: string; element: JSX.Element; title?: string };
  };
} = {
  root: {
    index: {
      path: '',
      element: <IndexView />
    },
    // personal_work: {
    //   path: 'personal_work',
    //   element: <PersonalWorkView />,
    //   title: 'personal work'
    // },
    // commissioned_work: {
    //   path: 'commissioned_work',
    //   element: <CommissionedWorkView />,
    //   title: 'commissioned work'
    // },
    // info: {
    //   path: 'info',
    //   element: <CommissionedWorkView />,
    //   title: 'info'
    // },
    // git_repo: {
    //   path: process.env.REACT_APP_github_repo_name,
    //   element: <IndexView />,
    //   title: ' '
    // },
    NotFound: { path: '404', element: <IndexView /> }
  }
};
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
      { path: '/', element: <Navigate to="/" /> },
      { path: '*', element: <Navigate to="/" /> }
    ]
  }
];

export default routes;

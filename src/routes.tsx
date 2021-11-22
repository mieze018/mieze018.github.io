import { Navigate } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import IndexView from 'views/Index';
//"View"で終わってる必要がある
export const urls = {
  root: {
    index: {
      path: '',
      element: <IndexView />,
      title: ' '
    },
    git_repo: {
      path: process.env.REACT_APP_github_repo_name,
      element: <IndexView />,
      title: ' '
    },
    NotFound: { path: '404', element: <IndexView /> }
  }
};
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

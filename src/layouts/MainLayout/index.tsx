import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from 'layouts/MainLayout/TopBar';

import './index.scss';

const MainLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <TopBar />
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          paddingTop: 64
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              flex: '1 1 auto',
              height: '100%',
              overflow: 'auto'
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

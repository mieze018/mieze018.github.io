// ⚛️
import React, { useEffect, useContext, memo } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
// 🧩
import { DataCTX } from 'App';
import { api_uri, api_Key, Blog_name } from 'functions';
import TopBar from 'layouts/MainLayout/TopBar';

import './index.scss';

const MainLayout = memo(() => {
  //🏁GetAPI start
  const GetDataCTX: any = useContext(DataCTX);
  // 🚩データの取得
  useEffect(() => {
    RefreshData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   setData(GetDataCTX[method]);
  // }, [GetDataCTX]);
  //🏁GetAPI end
  function RefreshData() {
    axios
      .get(`${api_uri}${Blog_name}/posts?api_key=${api_Key}`)
      .then((res) => {
        GetDataCTX.setDataCtx({
          ...GetDataCTX,
          loading: false,
          info: res.data.response.blog,
          posts: res.data.response.posts,
          description: res.data.response.blog['description'].split('<br/>', 1)
        });
      })
      .catch((err) => {
        GetDataCTX.setDataCtx({
          ...GetDataCTX,
          info: [err]
        });
      });
  }
  function SetHead() {
    document.title = GetDataCTX['info']['title'];
    document
      .querySelector('link[rel="apple-touch-icon"]')!
      .setAttribute('href', GetDataCTX['info']['avatar'][0]['url']);

    document
      .querySelector('meta[name="description"]')!
      .setAttribute('content', GetDataCTX['description']);
    document
      .querySelector('link[rel="icon"]')!
      .setAttribute('href', GetDataCTX['info']['avatar'][0]['url']);
  }

  return (
    <div>
      {GetDataCTX['info'] ? SetHead() : ''}
      <TopBar />
      <Outlet />
    </div>
  );
});

export default MainLayout;

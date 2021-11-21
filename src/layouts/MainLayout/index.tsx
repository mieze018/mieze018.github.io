// ⚛️
import React, { useEffect, useContext, memo, useState } from 'react';
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

  //🏁GetAPI end
  function RefreshData() {
    axios
      .get(`${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`)
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
  // 表示するポストのタグによる切り替え
  const tags = ['personal work', 'commission'];
  const [tagState, setTagState] = useState<string>(tags[0]);

  return (
    <>
      {GetDataCTX['info'] && SetHead()}
      <TopBar tags={tags} setTagState={setTagState} tagState={tagState} />

      <section id="wrapper" className="wrapper sunk-short fade-in">
        {/* <!--Content holder--> */}
        <div id="content" className="flex flex-col justify-center items-center">
          {GetDataCTX['posts'] &&
            GetDataCTX['posts']
              .filter((post: any) =>
                post.tags.find((tag: string, i: any) => tag === tagState)
              )
              .map((post: any, postK: any) => {
                return (
                  <article key={postK}>
                    <div className={`${post.type}`}>
                      <div className="container-l">
                        {post.photos.map((photo: any, photoK: any) => {
                          return (
                            <img
                              src={photo.original_size.url}
                              alt="img"
                              key={photoK}
                            />
                          );
                        })}
                      </div>
                      <div
                        className="container"
                        dangerouslySetInnerHTML={{
                          __html: post['caption']
                        }}
                      ></div>
                      <footer className="post__footer container">
                        <div className="metadata">
                          <ul className="post__buttons"></ul>
                          <ul className="post__info">
                            <li>
                              <span className="time-ago">
                                {new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: 'long'
                                }).format(new Date(post.date))}
                              </span>
                            </li>
                          </ul>
                          <ul className="post__tags"></ul>
                        </div>
                      </footer>
                    </div>
                  </article>
                );
              })}
        </div>
      </section>
      <Outlet />
    </>
  );
});

export default MainLayout;

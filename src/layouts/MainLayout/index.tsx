// ⚛️
import React, { useEffect, useContext, memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// 🧩
import { DataCTX } from 'App';
import { api_uri, api_Key, Blog_name } from 'functions';
import TopBar from './TopBar';
import Info from './info';

import './index.css';

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
          description: res.data.response.blog['description'].split('<br', 1)
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
  const tags = ['personal work', 'commissioned work', 'info'];
  const [tagState, setTagState] = useState<string>(tags[0]);

  function handleClickNavButton(tag: string) {
    setTagState(tag);
    GetDataCTX.setDataCtx({
      ...GetDataCTX,
      loading: true
    });
  }

  const now = new Date();
  const this_year = now.getFullYear();
  return (
    <>
      {GetDataCTX['info'] && SetHead()}
      <TopBar
        tags={tags}
        handleClickNavButton={handleClickNavButton}
        tagState={tagState}
      />

      <section id="wrapper" className="wrapper sunk-short fade-in">
        {/* <!--Content holder--> */}
        <div
          id="content"
          className="flex flex-col items-center justify-center min-h-screen"
        >
          {tagState === 'info' && <Info />}
          {GetDataCTX['posts'] &&
            GetDataCTX['posts']
              .filter((post: any) =>
                post.tags.find((tag: string, i: any) => tag === tagState)
              )
              .map((post: any, postK: any) => {
                return (
                  <article className="flex" key={postK}>
                    <div
                      className={`${
                        post.photoset_layout ? 'photoset block' : post.type
                      }`}
                    >
                      <div className="container-l">
                        {post.photos.map((photo: any, photoK: any) => {
                          return (
                            <LazyLoadImage
                              src={photo.alt_sizes[1].url}
                              alt={photo.alt_sizes[1].url}
                              width={photo.alt_sizes[1].width}
                              height={photo.alt_sizes[1].height}
                              afterLoad={() =>
                                GetDataCTX.setDataCtx({
                                  ...GetDataCTX,
                                  loading: false
                                })
                              }
                              key={photoK}
                              visibleByDefault={postK === 0 ? true : false}
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

      <footer className="pb-5 text-center">
        © 2009-{this_year} {process.env.REACT_APP_author}
      </footer>

      <Outlet />
    </>
  );
});

export default MainLayout;

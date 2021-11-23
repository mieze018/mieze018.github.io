// ⚛️
import React, { useEffect, useContext, memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// 🧩
import './index.css';
import { DataCTX } from 'App';
import { api_uri, api_Key, Blog_name } from 'functions';
import TopBar from './TopBar';
import Info from './info';

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
          error: [err]
        });
      });
  }
  function SetHead() {
    document.title = GetDataCTX['info']['title'];
    document
      .querySelector('link[rel="apple-touch-icon"]')
      ?.setAttribute('href', GetDataCTX['info']['avatar'][0]['url']);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', GetDataCTX['description']);
    document
      .querySelector('link[rel="icon"]')
      ?.setAttribute('href', GetDataCTX['info']['avatar'][0]['url']);
  }
  // 表示するポストのタグによる切り替え
  const tags = ['personal work', 'commissioned work', 'info'];
  const [tagState, setTagState] = useState<string>(tags[0]);

  function handleClickNavButton(tag: string) {
    GetDataCTX.error && RefreshData();
    document.getElementById('posts-wrapper')?.classList.remove('appear');

    setTimeout(
      function () {
        document.getElementById('posts-wrapper')?.classList.add('appear');
      },
      tag === 'info' ? 200 : 5000
    );
    setTimeout(function () {
      setTagState(tag);
    }, 300);
  }

  //表示クラス付与
  function switchEffect() {
    document.getElementById('posts-wrapper')?.classList.add('appear');
  }
  //現在の年を取得
  const now = new Date();
  const this_year = now.getFullYear();

  //ディスプレイサイズに応じて取得する画像のサイズ変更
  const displayFork = document.body.clientWidth > 1280 ? 0 : 1;

  return (
    <div className="m-auto">
      <TopBar
        tags={tags}
        handleClickNavButton={handleClickNavButton}
        tagState={tagState}
      />

      <section id="posts-wrapper" className="sunk-short">
        {/* <!--Content holder--> */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          {tagState === 'info' && <Info />}
          {GetDataCTX.posts
            ? GetDataCTX.posts
                .filter((post: any) =>
                  post.tags.find((tag: string, i: any) => tag === tagState)
                )
                .map((post: any, postK: any) => {
                  return (
                    <article
                      className="min-h-square flex mb-10 max-w-full"
                      key={postK}
                    >
                      <div
                        className={`${
                          post.photoset_layout ? 'photoset block' : post.type
                        }`}
                      >
                        <div className="photo-container min-w-golden23v xl:max-w-golden61v m-auto">
                          {post.photos.map((photo: any, photoK: any) => {
                            if (
                              !post.tags.find(
                                (tag: string, i: any) => tag === 's-o-l-p'
                              ) ||
                              photoK === post.photos.length - 1
                            ) {
                              return (
                                <LazyLoadImage
                                  className="w-full"
                                  src={photo.alt_sizes[displayFork].url}
                                  alt={photo.alt_sizes[displayFork].url}
                                  width={photo.alt_sizes[displayFork].width}
                                  height={photo.alt_sizes[displayFork].height}
                                  afterLoad={() =>
                                    postK === 0 &&
                                    photoK === post.photos.length - 1 &&
                                    switchEffect()
                                  }
                                  key={photoK}
                                  visibleByDefault={postK === 0 ? true : false}
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post['caption']
                          }}
                        ></div>
                        <footer className="post-footer mt-0 text-sm">
                          <div>
                            <ul>
                              <li>
                                <span className="time-ago">
                                  {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'long'
                                  }).format(new Date(post.date))}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </footer>
                      </div>
                    </article>
                  );
                })
            : 'API Error'}
        </div>
      </section>

      <footer className="pb-5 text-center text-xs">
        © 2009-{this_year} {process.env.REACT_APP_author}
      </footer>

      <Outlet />
      {GetDataCTX.info && SetHead()}
    </div>
  );
});

export default MainLayout;

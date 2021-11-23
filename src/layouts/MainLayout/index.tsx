// ⚛️
import React, { useEffect, useContext, memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

// 🧩
import './index.css';
import { DataCTX } from 'App';
import { api_uri, api_Key, Blog_name } from 'functions';
import TopBar from './TopBar';
import Info from './info';
import Posts from './Posts';

const tags = ['personal work', 'commissioned work'];
const navItems = ['info'];
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
  const [tagState, setTagState] = useState<string>(tags[0]);

  function handleClickNavButton(tag: string) {
    GetDataCTX.error && RefreshData();
    // document.getElementById('posts-wrapper')?.classList.remove('appear');

    // setTimeout(
    //   function () {
    //     document.getElementById('posts-wrapper')?.classList.add('appear');
    //   },
    //   tag === 'info' ? 200 : 5000
    // );
    // setTimeout(function () {
    setTagState(tag);
    // }, 300);
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
  //test
  return (
    <div className="m-auto">
      <TopBar
        navs={tags.concat(navItems)}
        handleClickNavButton={handleClickNavButton}
        tagState={tagState}
      />

      <CSSTransition
        in={true}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setTagState(tags[0])}
        onExited={() => setTagState(tags[1])}
      >
        <section id="posts-wrapper" className="sunk-short">
          {tags.map((tagGroup: any, tagGroupK: number) => {
            return (
              <Posts
                tag={tagGroup}
                tagState={tagState}
                displayFork={displayFork}
                switchEffect={switchEffect}
                key={tagGroupK}
              />
            );
          })}
          <Info tagState={tagState} tag={navItems[0]} />
        </section>
      </CSSTransition>
      <footer className="pb-5 text-center text-xs">
        © 2009-{this_year} {process.env.REACT_APP_author}
      </footer>

      <Outlet />
      {GetDataCTX.info && SetHead()}
    </div>
  );
});

export default MainLayout;

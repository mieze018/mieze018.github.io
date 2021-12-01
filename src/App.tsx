// ⚛️
import React, {
  useEffect,
  useContext,
  memo,
  useState,
  createContext
} from 'react';
import { Outlet } from 'react-router-dom';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

// 🧩
import './index.css';
import { DataCTXType } from 'Type';
import TopBar from 'layouts/MainLayout/TopBar';
import Info from 'layouts/MainLayout/info';
import Posts from 'layouts/MainLayout/Posts';
import 'index.css';
export const DataCTX = createContext<DataCTXType>({
  loading: false,
  setDataCtx: (props) => props
});

const tags = ['personal work', 'commissioned work'];
const navItems = ['info'];
const MainLayout = memo(() => {
  //ヘッダ内を設定
  process.env.REACT_APP_description &&
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', process.env.REACT_APP_description);
  process.env.REACT_APP_author &&
    document
      .querySelector('meta[name="author"]')
      ?.setAttribute('content', process.env.REACT_APP_author);
  process.env.REACT_APP_url &&
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('content', process.env.REACT_APP_url);

  //context
  const setDataCtx = (props: DataCTXType) => {
    setDataState({ ...DataState, ...props });
  };
  const [DataState, setDataState] = useState<DataCTXType>({
    setDataCtx: setDataCtx,
    loading: false
  });
  //🏁GetAPI start
  const GetDataCTX: any = useContext(DataCTX);
  // 🚩データの取得
  const api_uri = process.env.REACT_APP_api_URI;
  const api_Key = process.env.REACT_APP_api_Key;
  const Blog_name = `${process.env.REACT_APP_Tumblr_username}.tumblr.com`;
  useEffect(() => {
    RefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //🏁GetAPI end
  function RefreshData() {
    axios
      .get(`${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`, {
        timeout: 5000
      })
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
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', GetDataCTX['description']);
  }
  // 表示するポストのタグによる切り替え
  const [navState, setNavState] = useState<string>(tags[0]);

  function handleClickNavButton(tag: string) {
    GetDataCTX.error && RefreshData();

    if (window.pageYOffset > 0) {
      document.documentElement.scrollTop = window.innerHeight * 0.382 + 1;
    }
    setNavState(tag);
  }
  const fadePrefix = 'fade';
  //ディスプレイサイズに応じて取得する画像のサイズ変更
  const displayFork = document.body.clientWidth > 2500 ? 0 : 1;
  //test
  return (
    <DataCTX.Provider value={{ ...DataState }}>
      <div className="m-auto">
        <TopBar
          navs={tags.concat(navItems)}
          handleClickNavButton={handleClickNavButton}
          navState={navState}
        />

        <section id="posts-wrapper" className="sunk-short mt-golden61vh">
          {GetDataCTX.posts
            ? tags.map((tagGroup: any, tagGroupK: number) => {
                return (
                  <CSSTransition
                    in={navState === tagGroup}
                    appear={true}
                    timeout={500}
                    classNames={fadePrefix}
                    // onEnter={() => setTagState(navState)}
                    // onExited={() => setTagState(navState)}
                    key={tagGroupK}
                  >
                    <Posts
                      tag={tagGroup}
                      navState={navState}
                      displayFork={displayFork}
                      key={tagGroupK}
                      // className={tagGroupK === 0 ? `${fadePrefix}-enter-done ` : ``}
                    />
                  </CSSTransition>
                );
              })
            : GetDataCTX.error && String(GetDataCTX.error)}

          <CSSTransition
            in={navState === navItems[0]}
            timeout={500}
            classNames="fade"
          >
            <Info navState={navState} tag={navItems[0]} />
          </CSSTransition>
        </section>

        <Outlet />
        {GetDataCTX.info && SetHead()}
      </div>
    </DataCTX.Provider>
  );
});

export default MainLayout;

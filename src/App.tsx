// ⚛️
import { useEffect, memo, useState, createContext, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

// 🧩
import { DataCTXType } from 'Type';
import { TopBar } from 'components/molecules/TopBar';
import Info from 'components/molecules/info';
import Posts from 'components/organisms/Posts';
import 'index.css';
export const DataCTX = createContext({});

const MainLayout = memo(() => {
  let location = useLocation();
  const scrollTopContainer = useRef<HTMLDivElement>(null)
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
    loading: false,
    routes: [
      { name: 'personal work', pathname: '/personal_work' },
      {
        name: 'commissioned work',
        pathname: '/commissioned_work'
      },//todo:tumblrのタグもclient workに置換してから
      {
        name: 'info',
        pathname: '/info',
        isStatic: <Info />
      }
    ]
  });
  //🏁GetAPI start
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
        setDataCtx({
          ...DataState,
          loading: false,
          info: res.data.response.blog,
          posts: res.data.response.posts,
          description: res.data.response.blog['description'].split('<br', 1)
        });
      })
      .catch((err) => {
        setDataCtx({
          ...DataState,
          error: [err]
        });
      });
  }

  useEffect(() => {
    DataState.error && RefreshData();
    if (location.pathname !== '/' && scrollTopContainer?.current) {//window.pageYOffset > 0
      document.documentElement.scrollTop = window.innerHeight * 0.382 + 1;
    }
    DataState.setDataCtx({
      ...DataState
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const fadePrefix = 'fade';
  //ディスプレイサイズに応じて取得する画像のサイズ変更
  const displayFork = document.body.clientWidth > 2500 ? 0 : 1;

  return (
    <DataCTX.Provider value={{ ...DataState }}>
      <div className="m-auto" ref={scrollTopContainer} >
        <TopBar navs={DataState.routes} />

        <section id="posts-wrapper" className="sunk-short mt-golden61vh">
          {DataState.posts
            ? DataState.routes.map((route: any, routeK: number) => {
              return (
                <CSSTransition
                  in={
                    location.pathname === route.pathname ||
                    (location.pathname === '/' &&
                      route.pathname === DataState.routes[0].pathname)
                  }
                  appear={true}
                  timeout={500}
                  classNames={fadePrefix}
                  // onEnter={() => setTagState(navState)}
                  // onExited={() => setTagState(navState)}
                  key={routeK}
                >
                  <div
                    id={route.pathname}
                    className={`fade-wrapper`}
                  >
                    <Posts
                      tag={route}
                      displayFork={displayFork}
                      key={routeK}
                    // className={routeK === 0 ? `${fadePrefix}-enter-done ` : ``}
                    />
                  </div>
                </CSSTransition>
              );
            })
            : DataState.error && String(DataState.error)}
        </section>

        <Outlet />
      </div>
    </DataCTX.Provider >
  );
});

export default MainLayout;

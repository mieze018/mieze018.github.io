// ⚛️
import React, { useContext, memo, useEffect, useRef, useCallback } from 'react';
// 🧩
import { DataCTX } from 'App';
import { classList } from 'functions';
import './TopBar.css';
//
const TopBar = memo(
  (props: {
    navs: any[];
    handleClickNavButton: (tag: string) => void;
    navState: string;
  }) => {
    const GetDataCTX: any = useContext(DataCTX);

    //スマホでアクセスした時tumblrへのリンクをアプリから開くリンクに書き換え
    {
      const userAgent = window.navigator.userAgent.toLowerCase();

      if (
        userAgent.indexOf('iphone') !== -1 ||
        userAgent.indexOf('ipad') !== -1 ||
        userAgent.indexOf('android') !== -1
      ) {
        document.querySelector('html')?.classList.add('mobile');
      } else {
        document.querySelector('html')?.classList.add('desktop');
      }
      userAgent.indexOf('android') !== -1 &&
        document.querySelector('html')?.classList.add('android');
      // userAgent.indexOf('gecko') !== -1 &&
      //   document.querySelector('html')?.classList.add('gecko');
      document
        .querySelector('.mobile .tumblr')
        ?.setAttribute(
          'href',
          `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.REACT_APP_Tumblr_username}&page=blog`
        );
    }
    //スクロール
    const isRunning = useRef(false); // スクロール多発防止用フラグ
    // リスナに登録する関数
    const isScrollToggle = useCallback(() => {
      if (isRunning.current) return;
      isRunning.current = true;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      requestAnimationFrame(() => {
        const body = document.querySelector('body');
        scrollTop === 0 &&
          classList(body)
            ?.remove('scroll-top-gt-0')
            .remove('scroll-top-gt-23vh')
            .add('scroll-backed');
        scrollTop < window.innerHeight * 0.236 &&
          classList(body)?.remove('scroll-top-gt-23vh');
        scrollTop > window.innerHeight * 0.618 &&
          classList(body)?.add('scroll-top-gt-23vh').remove('scroll-backed');
        scrollTop > 0 &&
          classList(body)?.add('scroll-top-gt-0').remove('scroll-backed');

        isRunning.current = false;
      });
    }, []);

    // 登録と後始末
    useEffect(() => {
      document.addEventListener('scroll', isScrollToggle, { passive: true });
      return () => {
        document.removeEventListener('scroll', isScrollToggle, true);
      };
    }, []);

    return (
      <>
        {' '}
        <div
          id="floater"
          className="fixed z-10 top-0 w-full h-golden38vh bg-surface"
        ></div>
        <header className="fixed z-10 top-0 mb-0 w-full text-center text-sm">
          <div id="sinker" className="fixed mt-golden23vh">
            <div id="fade-outer">
              <h1 className="header-title hero tracking-title text-primary mb-1 text-3xl">
                {GetDataCTX['info']
                  ? GetDataCTX['info']['title']
                  : process.env.REACT_APP_title}
              </h1>

              <p className="header-desc hero">
                {GetDataCTX['description'] ? (
                  <span
                    dangerouslySetInnerHTML={{
                      // __html: GetDataCTX['info']['description']
                      __html: GetDataCTX['description']
                    }}
                  ></span>
                ) : (
                  process.env.REACT_APP_description
                )}
              </p>
            </div>
            <nav className="z-10 m-auto text-center text-base">
              {props.navs.map((tag: string, tagK: any) => (
                <button
                  onClick={() => props.handleClickNavButton(tag)}
                  className={` m-3  mix-blend-multiply tracking-widest ${
                    props.navState === tag && 'underline'
                  }`}
                  key={tagK}
                >
                  {tag}
                </button>
              ))}
            </nav>
          </div>
        </header>
      </>
    );
  }
);

export default TopBar;

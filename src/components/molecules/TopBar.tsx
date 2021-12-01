// ⚛️
import React, { useContext, memo, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
// 🧩
import { DataCTX } from 'App';
import { navs } from 'Type';
import { classList } from 'functions';
import './TopBar.css';
//
const TopBar = memo((props: { navs: navs }) => {
  const GetDataCTX: any = useContext(DataCTX);
  let location = useLocation();

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
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    requestAnimationFrame(() => {
      const body = document.querySelector('body');
      if (scrollTop === 0) {
        classList(body)
          ?.add('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh');
      } else if (scrollTop > window.innerHeight * 0.382) {
        classList(body)
          ?.add('scroll-top-gt-38vh')
          .remove('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh');
        // } else if (scrollTop > window.innerHeight * 0.236) {
        //   classList(body)
        //     ?.add('scroll-top-gt-23vh')
        //     .remove('scroll-backed')
        //     .remove('scroll-top-gt-0')
        //     .remove('scroll-top-gt-38vh');
      } else if (scrollTop > 0) {
        classList(body)
          ?.add('scroll-top-gt-0')
          .remove('scroll-backed')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh');
      }

      isRunning.current = false;
    });
  }, []);

  // 登録と後始末
  useEffect(() => {
    document.addEventListener('scroll', isScrollToggle, { passive: true });
    return () => {
      document.removeEventListener('scroll', isScrollToggle, true);
    };
  }, [isScrollToggle]);

  return (
    <>
      {' '}
      <div id="floater" className="fixed z-10 top-0 w-full bg-surface"></div>
      <header className="fixed z-10 top-0 mb-0 w-full text-center text-sm">
        <div id="sinker">
          <div id="fade-outer">
            <h1 className="header-title mb-1 text-primary text-2xl xs:text-3xl tracking-title">
              {GetDataCTX['info']
                ? GetDataCTX['info']['title']
                : process.env.REACT_APP_title}
            </h1>

            <p className="header-desc text-xs sm:text-base">
              {GetDataCTX['description'] ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: GetDataCTX['description']
                  }}
                ></span>
              ) : (
                process.env.REACT_APP_description
              )}
            </p>
          </div>
          <nav className="z-10 text-center">
            {props.navs.map((nav) => (
              <Link
                to={nav.pathname}
                key={nav.name}
                className={`m-2 xs:m-3  mix-blend-multiply xs:tracking-widest inline-block  ${
                  location.pathname === nav.pathname ||
                  (location.pathname === '/' &&
                    nav.pathname === GetDataCTX.routes[0].pathname)
                    ? 'underline'
                    : ''
                }`}
              >
                {nav.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
});

export default TopBar;

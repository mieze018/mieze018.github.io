// ⚛️
import React, { useContext, memo } from 'react';
// 🧩
import { DataCTX } from 'App';
import './TopBar.css';
//
const TopBar = memo(
  (props: {
    navs: any[];
    handleClickNavButton: (tag: string) => void;
    tagState: string;
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
      document
        .querySelector('.mobile .tumblr')
        ?.setAttribute(
          'href',
          `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.REACT_APP_Tumblr_username}&page=blog`
        );
    }

    return (
      <header className="grade1 z-10 top-0 w-full text-center text-sm">
        <div id="floater" className="index-img water"></div>
        <div id="sinker" className="sunk">
          <h1 className="head-title hero text-3xl">
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
          <nav className="m-auto text-center text-base">
            {props.navs.map((tag: string, tagK: any) => (
              <button
                onClick={() => props.handleClickNavButton(tag)}
                className={` m-3 ${props.tagState === tag && 'underline'}`}
                key={tagK}
              >
                {tag}
              </button>
            ))}
          </nav>
        </div>
      </header>
    );
  }
);

export default TopBar;

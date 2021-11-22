// ⚛️
import React, { useContext, memo } from 'react';
// 🧩
import { DataCTX } from 'App';
const TopBar = memo(
  (props: {
    tags: any[];
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
      <header className="head-wrap grade1">
        <div className="index-img water"></div>
        <div className="sunk">
          <h1 className="head-title hero">
            {GetDataCTX['info']['title']
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
        <nav className="ma text-center text-base">
          {props.tags.map((tag: string, tagK: any) => (
            <button
              onClick={() => props.handleClickNavButton(tag)}
              className={` m-3 ${props.tagState === tag && 'underline'}`}
              key={tagK}
            >
              {tag}
            </button>
          ))}
        </nav>
      </header>
    );
  }
);

export default TopBar;

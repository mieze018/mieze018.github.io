// ⚛️
import React, {
  useContext,
  memo,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
// 🧩
import { DataCTX } from 'App';
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
      document
        .querySelector('.mobile .tumblr')
        ?.setAttribute(
          'href',
          `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.REACT_APP_Tumblr_username}&page=blog`
        );
    }
    //スクロール
    const [isDisplay, setIsDisplay] = useState<boolean>(false);

    const isRunning = useRef(false); // スクロール多発防止用フラグ
    // リスナに登録する関数
    const isScrollToggle = useCallback(() => {
      if (isRunning.current) return;
      isRunning.current = true;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      requestAnimationFrame(() => {
        // console.log(scrollTop);
        if (scrollTop > 0) {
          setIsDisplay(true);
          !document.querySelector('header')?.classList.contains('shrink') &&
            document.querySelector('header')?.classList.add('shrink');
        } else if (scrollTop === 0) {
          setIsDisplay(false);
          document.querySelector('header')?.classList.contains('shrink') &&
            document.querySelector('header')?.classList.remove('shrink');
        }
        isRunning.current = false;
      });
    }, []);

    // 登録と後始末
    useEffect(() => {
      document.addEventListener('scroll', isScrollToggle, { passive: true });
      // return () => {
      //   document.removeEventListener('scroll', isScrollToggle, {
      //     passive: true
      //   });
      // };
    }, []);

    // バツボタンでリスナ削除~ などはこのように
    // const onClickClose = () => {
    // document.removeEventListener('scroll', isScrollToggle, { passive: true });
    // setIsDisplay(false);
    // };

    // const [scrollY, setScrollY] = useState<number>(0);

    // useEffect(() => {
    //   function watchScroll() {
    //     window.addEventListener('scroll', () => setScrollY(window.pageYOffset));
    //     scrollY > 500
    //       ? document.querySelector('header')?.classList.add('shrink')
    //       : document.querySelector('header')?.classList.remove('shrink');
    //   }
    //   watchScroll();
    // });
    return (
      <header className="z-10 top-0 w-full text-center text-sm">
        <div id="floater" className="index-img water"></div>
        <div id="sinker" className="sunk">
          <h1 className="header-title hero text-3xl">
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
                className={` m-3 ${props.navState === tag && 'underline'}`}
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

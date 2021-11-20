import React, { useEffect, useState, useContext, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DataCTX } from 'App';
import { GetAPI } from 'functions';
const TopBar = memo(() => {
  //🏁GetAPI start
  const GetDataCTX: any = useContext(DataCTX);
  const [data, setData] = useState<'error' | [] | any>();
  // 🚩データの取得
  const method = 'info';
  function RefreshData() {
    GetAPI({
      method: method,
      success: (res_data) => {
        GetDataCTX.setDataCtx({
          ...GetDataCTX,
          loading: false,
          [method]: res_data.response.blog
        });
      }
    });
  }
  useEffect(() => {
    RefreshData();
  }, []);
  useEffect(() => {
    setData(GetDataCTX[method]);
  }, [GetDataCTX]);
  //🏁GetAPI end
  return (
    <div className="head-wrap grade1">
      <div className="index-img water"></div>
      <div className="sunk">
        <div className="header-avatar">
          <img className="user-avatar hero" src="{PortraitURL-128}" />
        </div>

        <h1 className="head-title hero">{GetDataCTX[method]['title']}</h1>

        <p className="header-desc hero">
          by Ayu Nakata. Osaka, Japan-based illustrator/artist.
          <br />
          <br />
          <a href="/workExperience">Biography</a>
          <br />
          <a href="mailto:&#109;&#105;&#101;&#122;&#101;&#64;&#109;ie&#122;e0&#49;8.&#110;&#101;&#116;">
            Contact
          </a>
          <br />
          <br />
          <span className="SNS-link">
            <a href="https://mieze.booth.pm/" target="_blank">
              books
            </a>
            <a href="https://www.tumblr.com/blog/mieze018/" className="tumblr">
              tumblr
            </a>
            <a href="http://twitter.com/mieze018">twitter</a>
            <a href="http://mieze018.deviantart.com/">deviantart</a>
            <a href="http://www.pixiv.net/member.php?id=1144713">pixiv</a>
            <a href="https://www.behance.net/mieze018/">behance</a>
            <a href="http://instagram.com/mieze018">instagram</a>
          </span>
        </p>
      </div>
    </div>
  );
});

export default TopBar;

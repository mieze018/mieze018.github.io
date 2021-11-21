// ⚛️
import React, { useContext, memo } from 'react';
// 🧩
import { DataCTX } from 'App';
const TopBar = memo(() => {
  const GetDataCTX: any = useContext(DataCTX);
  return (
    <header className="head-wrap grade1">
      <div className="index-img water"></div>
      <div className="sunk">
        <h1 className="head-title hero">
          {GetDataCTX['info'] ? GetDataCTX['info']['title'] : ''}
        </h1>

        <p className="header-desc hero">
          {GetDataCTX['info'] ? (
            <span
              dangerouslySetInnerHTML={{
                __html: GetDataCTX['info']['description']
              }}
            ></span>
          ) : (
            ''
          )}
        </p>
      </div>
    </header>
  );
});

export default TopBar;

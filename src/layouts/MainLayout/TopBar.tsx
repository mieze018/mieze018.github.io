// ⚛️
import React, { useContext, memo } from 'react';
// 🧩
import { DataCTX } from 'App';
const TopBar = memo(() => {
  const GetDataCTX: any = useContext(DataCTX);
  return (
    <div className="head-wrap grade1">
      <div className="index-img water"></div>
      <div className="sunk">
        <h1 className="head-title hero">
          {GetDataCTX['info'] ? GetDataCTX['info']['title'] : ''}
        </h1>

        <p className="header-desc hero">
          {GetDataCTX['info'] ? (
            <span
              dangerouslySetInnerHTML={{ __html: GetDataCTX['description'] }}
            ></span>
          ) : (
            ''
          )}
        </p>
      </div>
    </div>
  );
});

export default TopBar;

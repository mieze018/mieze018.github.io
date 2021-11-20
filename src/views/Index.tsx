// ⚛️
import React, { useEffect, useState, useContext, memo } from 'react';
// 🧩
import Page from 'layouts/Page';
import Results from 'components/organisms/SimpleListView';
import { DataCTX } from 'App';
import { GetAPI } from 'functions';

const View = memo(() => {
  //🏁GetAPI start
  const GetDataCTX: any = useContext(DataCTX);
  const [data, setData] = useState<'error' | [] | any>();
  // 🚩データの取得
  const method = 'posts';
  function RefreshData() {
    GetAPI({
      method: method,
      success: (res_data) => {
        console.log(res_data);
        GetDataCTX.setDataCtx({
          ...GetDataCTX,
          loading: false,
          [method]: res_data.response
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
    <Page>
      <Results data={data} />
    </Page>
  );
});

export default View;

// ⚛️
import React, { useEffect, useState, useContext, memo } from 'react';
// 🧩
import Page from 'layouts/Page';
import Results from 'components/organisms/SimpleListView';
import { DataCTX } from 'App';
import { Posts } from 'components/functions/posts';

const View = memo(() => {
  const GetDataCTX: any = useContext(DataCTX);
  const [data, setData] = useState<'error' | [] | any>();
  // 🚩データの取得
  function RefreshData() {
    Posts({
      success: (res_data) => {
        console.log(res_data);
        GetDataCTX.setDataCtx({
          ...GetDataCTX,
          loading: false,
          posts: res_data.response
        });
      }
    });
  }

  useEffect(() => {
    RefreshData();
  }, []);

  useEffect(() => {
    setData(GetDataCTX.posts);
    console.log(GetDataCTX.posts);
  }, [GetDataCTX]);
  return (
    <Page>
      <Results data={data} />
    </Page>
  );
});

export default View;

//axiosのデバッグ用 getした値を表示するだけのページ http://localhost:3000/debug
// ⚛️
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 🧩
import axios, { Method } from 'axios';
import { Posts } from 'components/functions/posts';

//🏁
const ListView = () => {
  const navigate = useNavigate();

  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers.post['Content-Type'] =
    'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  const [method, setMethod] = useState<Method>('get');
  const [ComID, setComID] = useState<string>('company_id/');
  const [url1, setUrl1] = useState<string>(`management/companies/`);
  const [url2, setUrl2] = useState<string>('users/');
  const [Request_url, setRequest_url] = useState<string>();
  const [data, setData] = useState<any>();
  const [ResHeaders, setResHeaders] = useState<{}>();
  const [ReqData, setReqData] = useState({ name: 'DebugTest', is_active: 1 });
  useEffect(() => {
    setRequest_url(`${url1}${ComID === '0' ? '' : ComID}${url2}`);
  }, [url1, ComID, url2]);
  useEffect(() => {
    if (ComID === 'company_id/') {
      Posts({
        success: async function (res): Promise<void> {
          console.log(res);
        }
      });
    }
  }, [navigate, ComID]);
  //🚩データの取得
  function handleClick(e: any) {
    e.preventDefault();
    setData('waiting...');
    Posts({
      success: async function (res): Promise<void> {
        console.log(res);
      }
    });
  }

  //🏃
  return (
    <div>
      <form
        style={{
          padding: '0.5em',
          margin: '0.5em',
          letterSpacing: '0.08em',
          fontSize: '16px',
          textAlign: 'center'
        }}
        onSubmit={(e) => handleClick(e)}
      >
        <h6>request method/url </h6>
        <div style={{ whiteSpace: 'nowrap' }}>
          <select
            style={{
              padding: '0.5em',
              margin: '0.5em',
              width: '6em',
              letterSpacing: '0.08em',
              fontSize: '16px'
            }}
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as Method);
            }}
          >
            <option value="get">get</option>
            <option value="post">post</option>
            <option value="put">put</option>
            <option value="delete">delete</option>
          </select>

          <input
            type="text"
            style={{
              padding: '0.5em',
              margin: '0.5em',
              width: '30em',
              letterSpacing: '0.08em',
              fontSize: '16px'
            }}
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
          />
          <select value={ComID} onChange={(e) => setComID(e.target.value)}>
            <option value="company_id/">company_id/</option>
            <option value="0"></option>
          </select>

          <input
            type="text"
            style={{
              padding: '0.5em',
              margin: '0.5em',
              width: '30em',
              maxWidth: '30%',
              letterSpacing: '0.08em',
              fontSize: '16px'
            }}
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
          />
        </div>
        <div>
          <h6>post/put data(optional)</h6>
          <textarea
            value={JSON.stringify(ReqData)}
            style={{
              padding: '0.5em',
              margin: '0.5em',
              width: '30em',
              letterSpacing: '0.08em',
              fontSize: '16px'
            }}
            disabled={method !== 'post' && method !== 'put'}
            onChange={(e) => setReqData(JSON.parse(e.target.value))}
          />

          <div>
            <h4>
              "{method}" to <a href={Request_url}>{Request_url}</a>
            </h4>
            <button
              type="submit"
              style={{
                padding: '0.5em',
                margin: '0.5em',
                letterSpacing: '0.08em',
                fontSize: '16px'
              }}
            >
              送信
            </button>
          </div>
        </div>
      </form>
      <pre>{ResHeaders ? JSON.stringify(ResHeaders, null, '\t') : ''}</pre>
      <pre>{data ? JSON.stringify(data, null, '\t') : ''}</pre>
    </div>
  );
};
export default ListView;

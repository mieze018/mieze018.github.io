import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export const api_uri = 'https://api.tumblr.com/v2/blog/';
export const api_Key: string =
  '?api_key=' + '9MDztWXXMhCeeN5rXMyS89gqMxoIKNRegyqnOfFK81iscjVzEp';
export const Blog_name = 'mieze018.tumblr.com';

export function GetAPI(props: {
  method: 'info' | 'avatar' | 'posts' | 'tagged'; // https://www.tumblr.com/docs/en/api/v2
  success: (res_data: any) => any;
  catch?: (err: any) => any;
  finally?: () => any;
}): void {
  axios
    .get(`${api_uri}${Blog_name}/${props.method}${api_Key}`)
    .then((res) => {
      props.success(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      if (props.finally) {
        props.finally();
      }
    });
}

/** axiosのエラーレスポンスデータの型定義に'detail'パラメータを追加 */
export type Error = AxiosError<{ detail?: string | [{ msg: string }] }>;
/**エラーメッセージをstringに直す関数*/
export function SetErrMsg(error: Error): string {
  let ErrorMsg: string = '';
  if (!error.response || !error.response.data) {
    ErrorMsg = error['message'] ? error['message'] : 'Error';
  } else if (error.response.data.detail) {
    //エラーメッセージが配列だった場合
    if (Array.isArray(error.response.data.detail)) {
      ErrorMsg = String(
        error.response.data.detail.map((item) => `${item.msg} `)
      );
    } else {
      ErrorMsg = `${error.response.data.detail}`;
    }
  } else {
    ErrorMsg = String(error.response.status);
  }
  console.log(ErrorMsg);
  return ErrorMsg;
}
/**プロミスさせるだけの関数*/
export function funcPromise(props: any): Promise<[]> {
  return new Promise((resolve, reject): void => {
    if (props) {
      resolve(props);
    } else {
      reject('error');
    }
  });
}

/**複数ページで共通かつ設定がややこしいパラメータをコンポーネント化*/

/**データ取得の汎用関数 */
export function GetData(props: {
  request_url: string;
  success: (res_data: []) => any;
  catch?: (err: any) => any;
  finally?: () => any;
}): any {
  //📝 リクエストurl
  const request_url = props.request_url;
  axios
    .get(request_url)
    .then((res) => {
      props.success(res.data);
    })
    .catch((err): void => {
      SetErrMsg(err);
      props.catch && props.catch(err);
      return err;
    })
    .finally(() => {
      props.finally && props.finally();
    });
}

/**定期実行する関数
 * - interval = 1ms */
// export function useWatch(props: { interval: number; function: (any?) => any }) {
//   const [time, updateTime] = useState(Date.now());

//   useEffect(() => {
//     const timeoutId = setTimeout(() => updateTime(Date.now()), props.interval);
//     props.function();
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

//   return time;
// }

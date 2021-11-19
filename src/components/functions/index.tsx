import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { parameters } from 'Type';
import { tokenHeader } from 'components/functions/auth';

/**バックエンドのURLを一元管理 */
export const BackendURL = `https://www.tumblr.com/oauth/`;

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

/**メールアドレスのデフォルトパラメータ */
export const paramManagerEmail: parameters = {
  input_name: 'email',
  label: 'メールアドレス',
  required: true,
  show_in: ['Create', 'Update', 'Delete'],
  validation: (param) =>
    !/^[A-Za-z0-9]{1}[A-Za-z0-9+_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(
      param
    )
      ? '不正なメールアドレスです'
      : false
};
/**パスワードのデフォルトパラメータ */
export const paramManagerPassword: parameters = {
  input_name: 'password',
  type: 'password',
  label: 'パスワード',
  required: true,
  align: 'center',
  hide_in_list: true,
  show_in: ['Create'],
  validation: (param) =>
    !/^(?=.*?[a-z])(?=.*?\d)[a-zA-Z0-9!?_.\-/]{8,100}$/i.test(param)
      ? '半角英数字をそれぞれ最低1つ含む8文字以上のパスワードを入力してください (使用できる記号 !?_.-/)'
      : false,
  helperText: '半角英数字をそれぞれ最低1つ含む8文字以上 (使用できる記号 !?_.-/)'
};
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
    .get(request_url, tokenHeader())
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

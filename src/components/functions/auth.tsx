// ⚛️

// 🧰
import axios from 'axios';
// 🧩
// import { GetUrl } from 'routes';
import { BackendURL } from 'components/functions';
// 🏁

export const GetAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};
export const GetRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};
export function SetAccessToken(access_token: string): string | null {
  localStorage.setItem('access_token', access_token);
  return localStorage.getItem('access_token');
}
export function SetRefreshToken(refresh_token: string): string | null {
  localStorage.setItem('refresh_token', refresh_token);
  return localStorage.getItem('refresh_token');
}
/**よく使うけど微妙に長いので */
export const tokenHeader = (): {} => ({
  headers: {
    Authorization: `Bearer ${GetAccessToken()}`
  }
});
const tumblrConsumerKey: string =
    '9MDztWXXMhCeeN5rXMyS89gqMxoIKNRegyqnOfFK81iscjVzEp',
  tumblrConsumerSecret: string =
    'N639wokpjzDf8yw80JTtsBEV4f1qN357GUO9ufetXuDNVsk45E';
/**
 * ログイン中のマネージャー情報を返す
- navigate :useNavigateをネスト関数で使えないのでpropで渡す必要がある
- success  :me取得成功後に実行する関数。res_data:関数実行時にmeのresponse.dataを渡す。
- catch    :me取得失敗後に実行する関数
- finally  :meのpost後成功失敗にかかわらず実行する関数
 */
export function FetchMe(props: {
  // navigate: NavigateFunction;
  success: (res_data: {
    name: string;
    email: string;
    id: string;
    company: {
      id: string;
      name: string;
    };
  }) => any;
  catch?: (err: any) => any;
  finally?: () => any;
}): void {
  axios
    .get(`${BackendURL}authorize`, tokenHeader())
    .then((res) => {
      props.success(res.data);
    })
    .catch((err) => {
      console.log(err);
      axios
        .post(
          `${BackendURL}access_token`,
          {}, //data
          {
            headers: {
              Authorization: `Bearer ${GetRefreshToken()}`
            }
          }
        )
        .then((res) => {
          SetAccessToken(res.data.access_token);
          axios.get(`${BackendURL}authorize`, tokenHeader()).then((res) => {
            props.success(res.data);
          });
        })
        .catch((err) => {
          // リフレッシュトークン有効期限切れ、再ログイン
          if (props.catch) {
            props.catch(err);
          } else {
            // SignOut(props.navigate, {
            //   logout:
            //     "認証の有効期限が切れました。お手数ですが再度サインインしてください。",
            // });
          }
        });
    })
    .finally(() => {
      if (props.finally) {
        props.finally();
      }
    });
}

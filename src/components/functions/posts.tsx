// ⚛️

// 🧰
import axios from 'axios';
// 🧩

const tumblrConsumerKey: string =
  '9MDztWXXMhCeeN5rXMyS89gqMxoIKNRegyqnOfFK81iscjVzEp';
/**
 * ログイン中のマネージャー情報を返す
- navigate :useNavigateをネスト関数で使えないのでpropで渡す必要がある
- success  :me取得成功後に実行する関数。res_data:関数実行時にmeのresponse.dataを渡す。
- catch    :me取得失敗後に実行する関数
- finally  :meのpost後成功失敗にかかわらず実行する関数
 */
export function Posts(props: {
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
    .get(
      `https://api.tumblr.com/v2/blog/mieze018.tumblr.com/posts?api_key=${tumblrConsumerKey}`
    )
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

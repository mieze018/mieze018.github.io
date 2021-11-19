// import { NavigateFunction } from 'react-router';
/**CUDを指定する文字列。'Create' | 'Update' | 'Delete' | string 汎用的でないリクエストを使う場合は独自の文字列を都度用意する*/
export type cud = 'Create' | 'Update' | 'Delete' | 'tagDL' | 'ApplyTelCreate' | 'ApplyChannelUpdate' | 'ApplyTelDelete' | 'ApplyLicenseUpdate' | 'csvCreate';
/**リスト表示で使う型 
  - status:データを読み込み中、読み込み結果のフラグ管理
  - ListViewParams: リストで表示で使う値
  - data: リストに表示するデータ
  - parameters: ダイアログ表示時に使う各inputごとの設定
*/
export type ListProps = API_Request &
  DialogProps & {
    status: 'loading' | 'failed' | 'success';
    ListViewParams: ListViewParams;
    ActionButtons: ActionButtons; //継承用だと思います・・
    parameters: [Fields];
    data: any[];
    cud: cud; //継承用だと思います・・
  };
/**リスト表示で使う型
  - pageTitle: テーブルに表示するタイトル
  - pageDescription: テーブルに表示する説明文部分に表示するテキストや要素
  - FilteringTableRow:テーブルヘッダーに検索欄を表示するかどうか。falseでしない。それ以外でする。する場合インクリメントにするか検索ボタンクリック時の関数を渡す。
  - HideDataLength: テーブルのフッターにデータの件数を表示するかどうか
  - ActionButtons: 操作カラムのボタン設定
*/
export type ListViewParams = {
  pageTitle: string;
  pageDescription: string | JSX.Element;
  FilteringTableRow?:
  | 'increment'
  | { search: (any: any) => any; clear: (any: any) => any }
  | false;
  HideDataLength?: boolean;
  ActionButtons: ActionButtons[];
};
/** リスト表示での操作カラムのボタン設定。ダイアログを表示してAPIリクエストを送るのがデフォルトの動作になっている。 
  - method: 操作ボタンのcud指定
  - tooltip: ボタンにホバーした時のツールチップに表示するテキスト
  - icon: ボタンの表示に使うmuiのアイコン要素
  - color?: カラーコードか色名で指定
  - title?: 開いたダイアログに表示するタイトル
  - save?: 開いたダイアログの保存ボタンの文字列。デフォルトは「保存」
  - description?: 開いたダイアログに表示する説明文
  - request_url?: アクションのAPIリクエストに使うURLが汎用のものでない時に指定
  - responseType?: APIリクエストを送った後のレスポンスのtypeを指定
  - success_msg?: リクエスト成功後に表示するフラッシュメッセージのテキスト
  - customButton?: iconパラメータを上書き。アイコンクリック時にダイアログを開く以外の操作をしたい場合などに使用。引数は各データの内容。アイコンタグも含めて記述
*/
export type ActionButtons = {
  method: cud;
  tooltip: string;
  icon: JSX.Element;
  color?: string;
  title?: string;
  save?: string;
  description?: string | JSX.Element;
  request_url?: string;
  responseType?:
  | 'text'
  | 'json'
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'stream'
  | undefined;
  success_msg?: string;
  customButton?: (item: any) => any;
};
/** 確認ダイアログ（実行してよろしいですか？ダイアログ）の制御
  - open: 表示状態の制御
  - title?: ダイアログのタイトル
  - text?: ダイアログに表示するよろしいですか？テキスト。
  - okText?: OKボタンのテキスト。
  - handleOk: OKボタンを押した時に実行する関数
  -SetDialogValues: ダイアログの値を制御するための関数を指定
 */
export type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  text?: string;
  okText?: string;
  handleOk: () => void;
  SetDialogValues: (value: any) => void;
};
/** APIへのリクエスト時に汎用的に使う変数。トークンなど
  - UpdateFetchedData: リクエスト成功後に実行する関数
*/
export type API_Request = {
  // navigate: NavigateFunction;
  access_token: string;
  company_id: string;
  request_url: string;
  UpdateFetchedData: (any: any) => void;
};
/**取得したデータに対するテーブル、ダイアログでの扱いの指定
  - input_name: APIに送信するデータのパラメータ名
  - label: テーブルヘッダー、フォームのラベルに表示するテキスト
  - type?: フォームの種類。デフォルトはtext //todo:その他インプットの種類が増えたタイミングで増やす .mapのとこ全部
  - accept?:typeがfileの時許可するファイルタイプ指定
  - value?:フォームのデフォルトの値
  - disabled?: disabled=入力させない・送信しない
  - required?: trueで入力必須
  - validation?: バリデーションに使う。通った場合はfalse、通らなかった場合はエラーメッセージを返す
  - MenuItem?: type=selectの場合のプルダウンの中身を配列で
  - show_in?: このinputを表示するダイアログのcudを指定する。Createだけ表示とかUpdateだけ表示するため。
  - helperText?: フォームの下に表示する説明テキスト
  - hide_in_list?: リストのカラムで非表示にする
  - align?: リストで表示するテキストの横揃え指定
  - displayText?: リストで表示する内容を生データから加工する場合に指定。paramは生データ。
  - filterInput?: ヘッダーに検索欄を表示する場合の検索フォームエレメント
  - filterColSpan?: 検索欄のtdを右につなげる場合指定繋げる合計セル数を指定
  - style:セルのcss
*/
export type parameters = {
  input_name: string;
  label: string | JSX.Element;
  type?: 'text' | 'select' | 'number' | 'password' | 'file'; //todo:その他インプットの種類が増えたタイミングで増やす .mapのとこ全部
  accept?: string;//typeがfileの時許可するファイルタイプ指定
  value?: string | number | boolean;
  disabled?: boolean;
  required?: boolean;
  validation?: (param: any) => string | boolean | any;
  MenuItem?: { id: any; name: string }[];
  show_in?: cud[];
  helperText?: string;
  hide_in_list?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  displayText?: (param: any) => any;
  filterInput?: any;
  filterColSpan?: number;
  style?: React.CSSProperties;
};
/**フォームで入力中（送信前）のフィールドの値のやりとり
  - id?: number;
  - value: 入力中の値(value)
  - invalid?: 入力中の値のバリデーションの管理
  - invalid_msg?: 入力中の値のバリデーションのエラーメッセージの管理
  - file?: ファイルアップロードする場合のファイルデータ
*/
export type Fields = parameters & {
  id?: number;
  value: any;
  invalid?: boolean;
  invalid_msg?: string | boolean;
  file?: any;
};
/** APIに送信する値を入力するためのダイアログの制御
  - SetDialogValues: ダイアログの値を制御するための関数を指定
  - handleClickOpen: ダイアログを開く時にパラメータを渡すための関数
  - open?: 表示状態の制御
  - cud: cud; //継承用だと思います・・
  - ActionButtons: ActionButtons; //継承用だと思います・・
  - id?: 編集・削除時のurlなどで使用するid
  - index?: ローカルの値を編集する時に使う、データ辞書内での0始まりの並び順
  - Fields: import:ダイアログで入力中のフィールドの値のやりとり
*/
export type DialogProps = {
  // DialogVal: any;
  //📓 関数
  SetDialogValues: (any: any) => any;
  handleClickOpen: (any: any) => any;

  open?: boolean | undefined;
  cud: cud; //継承用だと思います・・
  ActionButtons: ActionButtons; //継承用だと思います・・
  id?: number;
  index?: number;
  Fields: Fields[];
  item?: { id: any; any: any };
};
/**取得データの格納 */
export type DataCTXType = {
  setDataCtx: (props: DataCTXType) => void;
  loading: boolean;
  me?: {
    id: string;
    name: string;
    email: string;
    company: { id: string; name: string }
  };
  ProfileDetails?: any[]
  ManagerPassword?: any[];
  PDFPassword?: any[];
  company?: any[];
  tels?: any[];
  users_with_ext?: any[];
  users?: any[];
  managers?: any[];
  callHistory?: any[];
  extensions?: any[];
  remainder_number?: any[];
  claims_company?: any[];
  claims_tel?: any[];
};
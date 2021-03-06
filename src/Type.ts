import { Genres } from "components/molecules/infoData";

/**取得データの格納 */
export type routeParam = {
  name: string;
  pathname: string;
  isStatic?: JSX.Element;
};
export type navs = routeParam[];
export type DataCTXType = {
  setDataCtx: (props: DataCTXType) => void;
  loading: boolean;
  info?: any[];
  posts?: any[];
  description?: any[];
  error?: any;
  routes: navs;
};


export type work = {
  gジャンル: typeof Genres[number];
  k形態?: '単行本' | '文庫本' | string;
  s出版社?: string;
  tタイトル: string;
  t著者?: string;
  dデザイン?: string;
  n発表年月?: string;
};

export type works = work[];
export type event = {
  tタイトル: string
  n日時: string
  b場所: string
}
export type events =event[]

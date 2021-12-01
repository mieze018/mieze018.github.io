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

/**取得データの格納 */
export type DataCTXType = {
  setDataCtx: (props: DataCTXType) => void;
  loading: boolean;
  info?: any[];
  posts?: any[];
  description?: any[];
};
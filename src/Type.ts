/**取得データの格納 */
export type DataCTXType = {
  setDataCtx: (props: DataCTXType) => void;
  loading: boolean;
  posts?: any[]
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
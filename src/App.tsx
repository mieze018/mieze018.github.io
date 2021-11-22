// ⚛️
import React, { useState, createContext } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
// 🧩
import { DataCTXType } from 'Type';
import 'index.scss';
export const DataCTX = createContext<DataCTXType>({
  loading: false,
  setDataCtx: (props) => props
});

const App = () => {
  const routing = useRoutes(routes);
  //ヘッダ内を設定
  process.env.REACT_APP_description &&
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', process.env.REACT_APP_description);
  process.env.REACT_APP_author &&
    document
      .querySelector('meta[name="author"]')
      ?.setAttribute('content', process.env.REACT_APP_author);
  process.env.REACT_APP_url &&
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('content', process.env.REACT_APP_url);
  //context
  const setDataCtx = (props: DataCTXType) => {
    setDataState({ ...DataState, ...props });
  };
  const [DataState, setDataState] = useState<DataCTXType>({
    setDataCtx: setDataCtx,
    loading: false
  });

  return (
    <DataCTX.Provider value={{ ...DataState }}>{routing}</DataCTX.Provider>
  );
};

export default App;

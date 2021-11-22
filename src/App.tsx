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

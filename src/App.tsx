// ⚛️
import React, { useState, useEffect } from 'react';
// 🧩
import './App.css';
import { FetchMe, tokenHeader } from 'components/functions/auth';

const App = () => {
  //🚩データの取得
  useEffect(() => {
    FetchMe({
      success: async function (res): Promise<void> {}
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;

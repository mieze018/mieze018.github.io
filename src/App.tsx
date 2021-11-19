// ⚛️
import React, { useState, useEffect } from 'react';
// 🧩
import './App.css';
import { Posts } from 'components/functions/posts';

const App = () => {
  //🚩データの取得
  useEffect(() => {
    Posts({
      success: async function (res): Promise<void> {
        console.log(res);
      }
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

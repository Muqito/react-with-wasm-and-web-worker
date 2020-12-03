import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import WebWorker from './web.worker.js';
import './App.css';

function App() {
  const [wasm, setWasm] = useState(null);
  const [number, setNumber] = useState(0);
  const webWorker = React.useRef(new WebWorker()).current;

  const onClickWebWorker = () => webWorker.postMessage(number);
  const onClickWasm = () => wasm.greet();
  useEffect(() => {
    const onWebWorkerMessage = (e) => {
      setNumber(e.data);
    };
    webWorker.addEventListener('message', onWebWorkerMessage);
    return () => webWorker.removeEventListener('message', onWebWorkerMessage);
  }, [number]);
  useEffect(() => {
    (async () => {
      try {
        const loadedWasm = await import('wasm-hello');
        setWasm(loadedWasm);
      } catch (e) {
        console.error('caught error', e);
      }
    })();
  }, []);
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
          {number}
          <button onClick={onClickWebWorker}>Increment number with WebWorker</button>
          {wasm && (<button onClick={onClickWasm}>Greet with WASM</button>)}
        </header>
      </div>
  );
}

export default App;
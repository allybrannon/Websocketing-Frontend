import React, { useState, useEffect } from "react";
import "./App.css";
import useWS from "./useWS";

function App() {
  const [msgs, setMsg] = useState([]);
  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, sendMessage] = useWS();

  useEffect(() => {
    if (!isConnected) {
      const receiveMessage = (evt) => {
        console.log(evt.data);

        setMsg([...msgs, evt.data]);
        console.log(msgs);
      };

      connect("ws://localhost:3423", receiveMessage);
      setIsConnected(true);
    }
  }, [connect, setMsg, msgs, isConnected]);

  const request = () => {
    sendMessage({ type: "request-amount" });
  };

  const deposit = () => {
    sendMessage({ type: "deposit-amount", payload: text });
  };
  return (
    <div className="App">
      <h1>Websocket React</h1>
      <div>
        <button id="request-amount" onClick={request}>
          Bank Total
        </button>
      </div>
      <button id="deposit-amount" onClick={deposit}>
        Deposit
      </button>
      <input onChange={(evt) => setText(evt.target.value)} />
      <div id="messages">
        {msgs.map((ms, idx) => (
          <div key={idx}>{ms}</div>
        ))}
      </div>
    </div>
  );
}

export default App;

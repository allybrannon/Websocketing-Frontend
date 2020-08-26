import { useState } from "react";
const useWS = () => {
  const [socket, setSocket] = useState(null);
  const connect = (
    url,
    onMessage = (evt) => {
      console.log(evt);
    }
  ) => {
    let s = new WebSocket(url);

    s.onopen = () => {
      s.onmessage = onMessage;
    };
    setSocket(s);
  };
  const sendMessage = (msg) => {
    socket.send(JSON.stringify(msg));
  };
  return [connect, sendMessage];
};

export default useWS;

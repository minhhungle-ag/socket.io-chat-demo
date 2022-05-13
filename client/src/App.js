import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  function handleJoinRoom() {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  }

  function handleSendMessage() {
    socket.emit('send_message', { message, room });
  }

  return (
    <div className="App">
      <input
        placeholder="Room number..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join room</button>

      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <h2>Message: {messageReceived}</h2>
    </div>
  );
}

export default App;

import React, { useCallback, useState, useEffect } from 'react'
import { useSocket } from './../contexts/SocketProvider';

function Lobby() {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  
  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
    e.preventDefault();
    socket.emit('room:join', {username, room})
    console.log({username,room});
  },[username, room, socket])

  useEffect(() => {
    socket.on("room:join", (data) => {
      console.log(`Data from backend ${data}`);
    })
  },[socket])

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='username'>Username: </label>
        <input 
        type='text' 
        id='username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username' 
        /> 

        <br/>
        
        <label htmlFor='room'>Room: </label>
        <input 
        type='room' 
        id='room' placeholder='room'
        value={room} 
        onChange={(e) => setRoom(e.target.value)}
        /> 

        <br/>
        
        <button>JOIN</button>
      </form>
    </div>
  )
}

export default Lobby
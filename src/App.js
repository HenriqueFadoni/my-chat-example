import React, { Component } from 'react';

import './style.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/Roomlist';
import NewRoomForm from './components/NewRoomForm';

class App extends Component {
  render() {
      return (
          <div className="app">
              <RoomList />
              <MessageList />
              <SendMessageForm />
              <NewRoomForm />
          </div>
      );
  }
}

export default App;

import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'

import './style.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/Roomlist';
import NewRoomForm from './components/NewRoomForm';

import { tokenUrl, instanceLocator } from './config'

class App extends Component {
    state = {
        messages: [],
        joinableRooms: [],
        joinedRooms: []
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'Star-Lord',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })

        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;

                this.currentUser.getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            joinableRooms,
                            joinedRooms: this.currentUser.rooms
                        })
                    })
                    .catch(err => console.log('error on joinableRooms: ', err));

                currentUser.subscribeToRoom({
                    roomId: 19729431,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
            .catch(err => console.log('error on joinableRooms: ', err));
    }

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: 19729431
        })
    }

    render() {
        return (
            <div className="app">
                <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
                <NewRoomForm />
            </div>
        );
    }
}

export default App
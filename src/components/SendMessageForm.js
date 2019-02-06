import React, { Component } from 'react'

class SendMessageForm extends Component {
    state = {
        message: ''
    }

    handleChange = event => {
        const newMessage = event.target.value;

        this.setState({message: newMessage});
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm;
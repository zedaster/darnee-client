import {Component} from "react";
import "../../assets/css/ChatPage.css"
import MessageGroup from "../../components/message/MessageGroup";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessages: [
                {id: '1', text: 'First example message'},
                {id: '2', text: 'Second msg'}
            ],
            input: '',
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <div className="chat-page mb-5">
                <div className="messages-container">
                    <MessageGroup sentByUser messages={this.state.userMessages}/>
                </div>
                <form className="input-container" onSubmit={this.sendMessage}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type something..."
                            value={this.state.input}
                            onChange={this.handleInputChange}
                        />
                        <button type="submit" className="btn btn-primary" onClick={this.sendMessage}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    sendMessage(event) {
        event.preventDefault();
        if (!this.state.input.trim()) return;
        this.setState(prev => {
            return {
                userMessages: [
                    ...prev.userMessages,
                    {
                        id: prev.userMessages.length + 1,
                        text: this.state.input
                    }
                ],
                input: '',
            }
        });

    }

    handleInputChange(event) {
        this.setState({input: event.target.value}); // Update the messageText state with the input value
    }
}

export default ChatPage;
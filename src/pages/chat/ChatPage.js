import {Component} from "react";
import "../../assets/css/ChatPage.css"
import MessageGroup from "../../components/message/MessageGroup";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {io} from "socket.io-client";
import {Link} from "react-router-dom";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // {sentByUser: true, messages: [{id: '1', text: 'First example message'}, {id: '2', text: 'Second msg'}]
            messageGroups: [],
            input: '',
            scrollMessagesDown: false,
            loaded: false,
            connectionError: null,
        };

        this.getNewMessageGroups = this.getNewMessageGroups.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        console.log('Mounting ChatPage');
        // TODO: Get chat_id form GET params
        if (this.state.connectionError === null && !this.state.loaded) {
            const searchParams = new URLSearchParams(window.location.search);
            const chat_id = searchParams.get('id');
            if (typeof chat_id !== 'string' || chat_id.length !== 40) {
                this.setState({connectionError: 'invalid_chat_id'});
            }

            this.socket = io.connect(process.env.REACT_APP_CHAT_SOCKET_URL, {query: {chat_id: chat_id}});
            this.socket.on('connection_error', (error) => {
                console.log('Connection error: ' + error);
                this.setState({connectionError: error.message});
            })
            this.socket.on('connection_success', (messages) => {
                this.setState({loaded: true})
            });
            this.socket.on('receive_message', this.receiveMessage);
        }
    }

    componentWillUnmount() {
        console.log('Unmounting ChatPage');
        // Disconnect from the socket if it's connected
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    render() {
        let messageGroups;
        if (this.state.connectionError === null) {
            messageGroups = this.state.messageGroups.map(group => (
                <MessageGroup sentByUser={group.sentByUser} messages={group.messages}/>
            ));
        } else {
            messageGroups =
                <div className="alert alert-danger">
                    {this.connectionErrorToHtml(this.state.connectionError)}
                </div>;
        }

        return (
            <PageFlexBase showBackButton linkButtonResource="https://google.com/">
                {/* TODO: Change the link button resource */}
                <div className="chat-page mb-5">
                    <div className="messages-container" id="messages-container">
                        {messageGroups}
                    </div>
                    <form className="input-container" onSubmit={this.sendMessage}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type something..."
                                value={this.state.input}
                                onChange={this.handleInputChange}
                                disabled={!this.state.loaded}/>
                            <button
                                type="submit"
                                className="btn btn-primary px-3"
                                onClick={this.sendMessage}
                                disabled={!this.state.loaded}>
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </PageFlexBase>
        );
    }

    getNewMessageGroups(sentByUser, message) {
        const newMessageGroups = JSON.parse(JSON.stringify(this.state.messageGroups));
        if (this.state.messageGroups.length === 0 ||
            this.state.messageGroups[this.state.messageGroups.length - 1].sentByUser !== sentByUser) {
            newMessageGroups.push({
                sentByUser: sentByUser,
                messages: [message]
            });
        } else {
            newMessageGroups[this.state.messageGroups.length - 1].messages.push(message);
        }
        return newMessageGroups;
    }

    sendMessage(event) {
        // TODO: Handle sending message error
        // Avoid sending if the message text is empty
        if (!this.state.input.trim()) return;
        // Create new array of message groups
        const newMessageGroups = this.getNewMessageGroups(true, {text: this.state.input})
        // Update the state
        this.setState(prev => {
            return {
                messageGroups: newMessageGroups,
                input: '',
                scrollMessagesDown: true,
            }
        });
        event.preventDefault();
        this.socket.emit('send_message', {"text": this.state.input})
    }

    receiveMessage(message) {
        console.log("Received message: " + message.text)
        this.setState(prev => {
            return {
                messageGroups: this.getNewMessageGroups(false, message),
                scrollMessagesDown: true,
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.scrollMessagesDown) {
            // Scroll down to the new message
            const container = document.getElementById("messages-container");
            container.scroll({top: container.scrollHeight, behavior: "smooth"});
            this.setState({scrollMessagesDown: false})
        }
    }

    handleInputChange(event) {
        this.setState({input: event.target.value}); // Update the messageText state with the input value
    }

    connectionErrorToHtml(error) {
        switch (error) {
            case 'invalid_chat_id':
                return <p>The chat doesn't exists. Ask for another link or go to <Link to="/">main page</Link> to
                    restore your chat rooms or create new one.</p>;
        }
    }
}

export default ChatPage;
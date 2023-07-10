import {Component} from "react";
import "../../assets/css/ChatPage.css"
import MessageGroup from "../../components/message/MessageGroup";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {Link} from "react-router-dom";
import {withRouterParams} from "../../utils/router";
import ChatSocketService from "../../services/ChatSocketService";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // {sentByUser: true, messages: [{id: '1', text: 'First example message'}, {id: '2', text: 'Second msg'}]
            messageGroups: [],
            chatUsers: {},
            input: '',
            scrollMessagesDown: false,
            loaded: false,
            inviteHash: null,
            connectionError: null,
        };

        this.onSocketConnected = this.onSocketConnected.bind(this);
        this.getLinkButtonResource = this.getLinkButtonResource.bind(this);
        this.getNewMessageGroups = this.getNewMessageGroups.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        console.log('Mounting ChatPage');
        if (this.state.connectionError === null && !this.state.loaded) {
            const chatId = this.props.params.id;
            if (typeof chatId !== 'string') {
                this.setState({connectionError: 'invalid_chat_id'});
                return;
            }

            const onSocketError = (error) => {
                console.log('Connection error: ' + error);
                this.setState({connectionError: error.message});
            }

            this.socketService = new ChatSocketService(chatId,
                this.onSocketConnected,
                onSocketError,
                this.receiveMessage);
        }
    }

    onSocketConnected(response) {
        console.log('Socket connected');
        console.log('Response: ' + JSON.stringify(response))
        console.log('Socket messages: ' + JSON.stringify(response.messages));
        console.log('Chat users: ' + JSON.stringify(response.messages));
        const userId = this.socketService.userId;
        console.log('User id: ' + userId);
        const inviteHash = response.inviteHash;
        const messageGroups = this.getNewMessageGroups(response.messages);
        this.setState({loaded: true, inviteHash: inviteHash, messageGroups: messageGroups});
    }

    componentWillUnmount() {
        // Disconnect from the socket if it's connected
        if (this.socketService) {
            this.socketService.disconnect()
        }
    }

    render() {
        let messageGroups;
        if (this.state.connectionError === null) {
            messageGroups = this.state.messageGroups.map(group => (
                <MessageGroup sentByUser={group.sender === this.socketService.userId} sender={group.sender} messages={group.messages}/>
            ));
        } else {
            messageGroups =
                <div className="alert alert-danger">
                    {this.connectionErrorToHtml(this.state.connectionError)}
                </div>;
        }

        return (
            <PageFlexBase showBackButton linkButtonResource={this.getLinkButtonResource()}>
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

    getLinkButtonResource() {
        if (this.state.inviteHash === null) return null;
        const origin = window.location.origin;
        return origin + '/join/' + this.state.inviteHash;
    }

    getNewMessageGroups(newMessages) {
        if (typeof newMessages !== "object") {
            throw Error('newMessages must be an object')
        }
        if (!Array.isArray(newMessages)) {
            newMessages = [newMessages]
        }
        const newMessageGroups = JSON.parse(JSON.stringify(this.state.messageGroups));
        for (const message of newMessages) {
            if (newMessageGroups.length === 0 ||
                newMessageGroups[newMessageGroups.length - 1].sender !== message.sender) {
                newMessageGroups.push({
                    sender: message.sender,
                    messages: [message]
                });
            } else {
                newMessageGroups[newMessageGroups.length - 1].messages.push(message);
            }
        }
        return newMessageGroups;
    }

    sendMessage(event) {
        event.preventDefault();
        // TODO: Handle sending message error
        // Avoid sending if the message text is empty
        if (!this.state.input.trim()) return;
        // Create new array of message groups
        const newMessageGroups = this.getNewMessageGroups({text: this.state.input, sender: this.socketService.userId})
        // Update the state
        this.setState(prev => {
            return {
                messageGroups: newMessageGroups,
                input: '',
                scrollMessagesDown: true,
            }
        });
        this.socketService.sendMessage({"text": this.state.input});
    }

    receiveMessage(message) {
        this.setState(prev => {
            return {
                messageGroups: this.getNewMessageGroups(message),
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
            case 'no_token':
                return <p>Please ask for invite link or go to <Link to="/">main
                    page</Link> to restore your chat rooms or create new one.</p>;
        }
    }
}

export default withRouterParams(ChatPage);
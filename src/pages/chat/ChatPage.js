import {Component} from "react";
import "../../assets/css/ChatPage.css"
import MessageGroup from "../../components/message/MessageGroup";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {Link} from "react-router-dom";
import {withRouterParams} from "../../utils/router";
import ChatSocketService from "../../services/ChatSocketService";
import {createEnum} from "../../utils/enum";

const InputState = createEnum(['EMPTY', 'VALID', 'CHAR_LIMIT_EXCEEDED'])
class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // {sentByUser: true, messages: [{id: '1', text: 'First example message'}, {id: '2', text: 'Second msg'}]
            messageGroups: [],
            chatUsers: {},
            input: '',
            inputState: InputState.EMPTY,
            scrollMessagesDown: false,
            loaded: false,
            inviteHash: null,
            connectionError: null,
        };

        this.onSocketConnected = this.onSocketConnected.bind(this);
        this.onUserJoined = this.onUserJoined.bind(this);
        this.getInvalidFeedbackDisplayClass = this.getInvalidFeedbackDisplayClass.bind(this);
        this.getInputClasses = this.getInputClasses.bind(this);
        this.getLinkButtonResource = this.getLinkButtonResource.bind(this);
        this.getNewMessageGroups = this.getNewMessageGroups.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (this.state.connectionError === null && !this.state.loaded) {
            const chatId = this.props.params.id;
            if (typeof chatId !== 'string') {
                this.setState({loaded: true, connectionError: 'invalid_chat_id'});
                return;
            }

            const onSocketError = (error) => {
                console.log('Connection error: ' + error);
                this.setState({loaded: true, connectionError: error.message});
            }

            this.socketService = new ChatSocketService(chatId,
                this.onSocketConnected,
                onSocketError,
                this.receiveMessage,
                this.onUserJoined);
        }
    }

    onSocketConnected(response) {
        console.log('Socket connected');
        const users = Object.fromEntries(response.users.map(row => [row._id, row.name]))
        const inviteHash = response.inviteHash;
        const messageGroups = this.getNewMessageGroups(response.messages);
        this.setState({loaded: true, chatUsers: users, inviteHash: inviteHash, messageGroups: messageGroups});
    }

    onUserJoined(response) {
        const id = response._id
        const name = response.name
        console.log(`New user ${JSON.stringify(response)} joined to the chat`)
        const newUsers = {...this.state.chatUsers}
        newUsers[id] = name
        this.setState({chatUsers: newUsers})
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
                <MessageGroup sentByUser={group.sender === this.socketService.userId}
                              sender={this.state.chatUsers[group.sender]}
                              messages={group.messages}
                />
            ));
            if (messageGroups.length === 0) {
                messageGroups = (<div className="centered-page">
                    <div className="centered-page-content">
                        <p className="text-muted">All messages will be shown here</p>
                    </div>
                </div>)
            }
        } else {
            messageGroups =
                <div className="alert alert-danger">
                    {this.connectionErrorToHtml(this.state.connectionError)}
                </div>;
        }

        if (!this.state.loaded) {
            return (
                <PageFlexBase showBackButton>
                    <div className="centered-page">
                        <div className="centered-page-content">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </PageFlexBase>
            )
        } else {
            return (
                <PageFlexBase showBackButton linkButtonResource={this.getLinkButtonResource()}>
                    <div className="chat-page mb-5">
                        <div className="messages-container" id="messages-container">
                            {messageGroups}
                        </div>
                        <form className="input-container" onSubmit={this.sendMessage}>
                            <div className={"invalid-feedback mb-1 " + this.getInvalidFeedbackDisplayClass()}>
                                4096 characters is maximum message length
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="message-input"
                                    className={"form-control " + this.getInputClasses()}
                                    placeholder="Type something..."
                                    value={this.state.input}
                                    onChange={this.handleInputChange}
                                    disabled={!this.state.loaded || this.state.connectionError}/>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-3"
                                    onClick={this.sendMessage}
                                    disabled={this.state.inputState !== InputState.VALID}>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </PageFlexBase>
            );
        }
    }

    getInvalidFeedbackDisplayClass() {
        if (this.state.inputState === InputState.CHAR_LIMIT_EXCEEDED) {
            return "d-flex";
        }
        return "d-none";
    }

    getInputClasses() {
        if (this.state.inputState === InputState.CHAR_LIMIT_EXCEEDED) {
            return "is-invalid";
        }
        return "";
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
        const text = event.target.value;
        const cleanText = text.trim();
        if (!cleanText) {
            this.setState({inputState: InputState.EMPTY, input: text});
            return;
        }
        if (cleanText.length > 4096) {
            this.setState({inputState: InputState.CHAR_LIMIT_EXCEEDED, input: text});
            return;
        }
        this.setState({inputState: InputState.VALID, input: text});
    }

    connectionErrorToHtml(error) {
        switch (error) {
            case 'invalid_chat_id':
                return <p>The chat doesn't exists. Ask for another link or go to <Link to="/">main page</Link> to
                    restore your chat rooms or create new one.</p>;
            case 'no_token':
                return <p>Please ask for invite link or go to <Link to="/">main
                    page</Link> to restore your chat rooms or create new one.</p>;
            default:
                return <p>Unknown error happened. Try to refresh the page.</p>
        }
    }
}

export default withRouterParams(ChatPage);
import {Component} from "react";
import "../../assets/css/ChatPage.css"
import Message from "../../components/message/Message";
import MessageGroup from "../../components/message/MessageGroup";

class ChatPage extends Component {
    render() {
        return (
            <div className="chat-page mb-5">
                <div className="messages-container">
                    <MessageGroup sentBy="Juan">
                        <Message>This is a message</Message>
                        <Message>This is a message</Message>
                    </MessageGroup>
                    <MessageGroup sentByUser>
                        <Message>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </Message>
                        <Message>Sure</Message>
                    </MessageGroup>
                    <MessageGroup sentByUser>
                        <Message>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </Message>
                        <Message>Sure</Message>
                    </MessageGroup>
                </div>
                <div className="input-container">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Type something..."/>
                        <button className="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatPage;
import {Component} from "react";
import "../../assets/css/MessageGroup.css"
import Message from "./Message";

class MessageGroup extends Component {
    constructor(props) {
        super(props);
        this.messageLineClass = 'message-line';
        if (props.sentByUser) {
            this.messageLineClass += ' user-message-line'
        }
        this.sender = (props.sentByUser ? "You" : props.sentBy) ?? "unknown";
    }

    render() {
        const messages = this.props.messages.map(msg => (
            <div className={this.messageLineClass}><Message>{msg.text}</Message></div>)
        );
        return (
            <div className="message-group">
                <div className="message-group-content">
                    {messages}
                </div>
                <span className="sender text-muted ms-1">{this.sender}</span>
            </div>
        )
    }
}

export default MessageGroup;
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
        console.log('[MessageGroup] Sent by current user ' + JSON.stringify(this.props.sentByUser))
        console.log('[MessageGroup] Sender id ' + JSON.stringify(this.props.sender))
        console.log('[MessageGroup] messages' + JSON.stringify(this.props.messages))
        this.sender = (props.sentByUser ? "You" : props.sender) ?? "unknown";
    }

    render() {
        const messages = this.props.messages.map(msg => (
            <div className={this.messageLineClass}><Message text={msg.text} /></div>)
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
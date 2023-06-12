import {Component} from "react";
import "../../assets/css/MessageGroup.css"

class MessageGroup extends Component {
    constructor(props) {
        super(props);
        this.messageLineClass = 'message-line';
        if (props.sentByUser) {
            this.messageLineClass += ' user-message-line'
        }
        this.sender = (props.sentByUser ? "You" : props.sentBy) ?? "unknown";
        if (this.props.children instanceof Array) {
            this.childrenArray = this.props.children;
        } else {
            this.childrenArray = new Array(this.props.children);
        }
    }

    render() {
        return (
            <div className="message-group">
                <div className="message-group-content">
                    {this.childrenArray.map((child) => (<div className={this.messageLineClass}>{child}</div>))}
                </div>
                <span className="sender text-muted ms-1">{this.sender}</span>
            </div>
        )
    }
}

export default MessageGroup;
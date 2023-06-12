import {Component} from "react";
import '../../assets/css/Message.css'

class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: Rename className to message
        return (
                <div className="message">
                    <div className="message-text">
                        <span>{this.props.children}</span>
                    </div>
                </div>
        );
    }
}

export default Message;
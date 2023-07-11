import {Component} from "react";
import '../../assets/css/Message.css'

const URL_REGEX = /^https?:\/\/[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

class Message extends Component {
    constructor(props) {
        super(props);
        this.text = this.props.text
            .split(" ")
            .map(part =>
                URL_REGEX.test(part) ? <a href={part} target="_blank">{part} </a> : part + " "
            );
    }

    render() {
        return (
                <div className="message">
                    <div className="message-text">
                        {this.text}
                    </div>
                </div>
        );
    }
}

export default Message;
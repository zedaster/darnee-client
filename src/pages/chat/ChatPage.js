import {Component} from "react";
import "../../assets/css/ChatPage.css"
import MessageGroup from "../../components/message/MessageGroup";
import PageFlexBase from "../../components/flex-base/PageFlexBase";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessages: [
                {id: '1', text: 'First example message'},
                {id: '2', text: 'Second msg'}
            ],
            input: '',
            scrollMessagesDown: false,
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <PageFlexBase showBackButton linkButtonResource="https://google.com/">
                <div className="chat-page mb-5">
                    <div className="messages-container" id="messages-container">
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
                            <button type="submit" className="btn btn-primary px-3" onClick={this.sendMessage}>
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </PageFlexBase>
        );
    }

    sendMessage(event) {
        // Avoid sending if the message text is empty
        if (!this.state.input.trim()) return;
        // Set state
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
                scrollMessagesDown: true,
            }
        });
        event.preventDefault();
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
}

export default ChatPage;
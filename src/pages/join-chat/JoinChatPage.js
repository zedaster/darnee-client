import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {withRouterNavigate, withRouterParams} from "../../utils/router";
import {StartForm} from "../../components/start-form/StartForm";
import AuthService from "../../services/AuthService";

class JoinChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isSubmitting: false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const inviteHash = this.props.params.id;
        AuthService.isUserAuthorized(inviteHash).then(response => {
            if (response.isAuthorized) {
                this.props.navigate(`/chat/${response.chatId}`);
            } else {
                this.setState({loaded: this})
            }
        })
    }

    render() {
        return (
            <PageFlexBase isLoading={!this.state.loaded}>
                <div className="centered-page">
                    <div className="centered-page-content">
                        <h3 className="mb-4 text-center">You are almost in the chat</h3>
                        <StartForm onFormSubmit={this.handleFormSubmit} isSubmitting={this.state.isSubmitting} />
                    </div>
                </div>
            </PageFlexBase>
        )
    }

    handleFormSubmit(payload) {
        this.setState({isSubmitting: true});
        const inviteHash = this.props.params.id;
        AuthService.joinChat(payload.name, payload.email, inviteHash).then((chatId) => {
            this.props.navigate(`/chat/${chatId}`);
        });
    }
}

export default withRouterParams(withRouterNavigate(JoinChatPage));
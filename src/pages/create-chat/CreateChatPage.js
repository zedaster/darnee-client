import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {withRouterNavigate} from "../../utils/router";
import AuthService from "../../services/AuthService";
import {StartForm} from "../../components/start-form/StartForm";

class CreateChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <PageFlexBase showBackButton>
                <div className="centered-page">
                    <div className="centered-page-content centered-page-full-width">
                        <h3 className="mb-4 text-center">A bit more to start</h3>
                        <StartForm onFormSubmit={this.handleFormSubmit} isSubmitting={this.state.isSubmitting} />
                    </div>
                </div>
            </PageFlexBase>
        )
    }

    handleFormSubmit(payload) {
        this.setState({isSubmitting: true});
        AuthService.createChat(payload.name, payload.email).then((chatId) => {
            this.props.navigate(`/chat/${chatId}`);
        });
    }
}

export default withRouterNavigate(CreateChatPage);
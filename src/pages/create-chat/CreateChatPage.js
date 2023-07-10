import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {createEnum} from "../../utils/enum";
import {withRouterNavigate} from "../../utils/router";
import AuthService from "../../services/AuthService";
import {NameInput, NameState} from "../../components/form/NameInput";
import {EmailInput} from "../../components/form/EmailInput";

const EmailState = createEnum(['EMPTY', 'TYPING_EMPTY', 'TYPING_INVALID', 'TYPING_VALID', 'VALID', 'INVALID']);

class CreateChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            nameState: NameState.EMPTY,
            emailState: EmailState.EMPTY,
            isSubmitting: false,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <PageFlexBase showBackButton>
                <div className="centered-page">
                    <div className="centered-page-content centered-page-full-width">
                        <h3 className="mb-4 text-center">A bit more to start</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <NameInput className="mb-3" onInputChange={this.handleNameChange} />
                            <EmailInput className="mb-3" onInputChange={this.handleEmailChange} />
                            <button type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={this.isButtonDisabled}>
                                Let's go!
                            </button>
                        </form>
                    </div>
                </div>
            </PageFlexBase>
        )
    }

    get isButtonDisabled() {
        const enabledNameStates = [NameState.VALID, NameState.TYPING_VALID];
        const enabledEmailStates = [EmailState.VALID, EmailState.TYPING_VALID, EmailState.EMPTY, EmailState.TYPING_EMPTY];
        return this.state.isSubmitting ||
            !enabledNameStates.includes(this.state.nameState) ||
            !enabledEmailStates.includes(this.state.emailState);
    }

    handleNameChange(newName, newNameState) {
        this.setState({name: newName, nameState: newNameState});
    }

    handleEmailChange(newEmail, newEmailState) {
        this.setState({email: newEmail, emailState: newEmailState});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.setState({isSubmitting: true});
        AuthService.createChat(this.state.name, this.state.email).then((chatId) => {
            this.props.navigate(`/chat/${chatId}`);
        });
    }
}

export default withRouterNavigate(CreateChatPage);
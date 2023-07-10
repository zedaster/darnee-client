import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {createEnum} from "../../utils/enum";
import {isValidEmail, isValidName} from "../../utils/validator";
import {withRouterNavigate} from "../../utils/router";
import AuthService from "../../services/AuthService";
import {NameInput, NameState} from "../../components/form/NameInput";

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
        this.handleEmailFocused = this.handleEmailFocused.bind(this);
        this.handleEmailBlurred = this.handleEmailBlurred.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <PageFlexBase showBackButton>
                <div className="centered-page">
                    <div className="centered-page-content centered-page-full-width">
                        <h3 className="mb-4 text-center">A bit more to start</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <NameInput className="mb-3" onInputChange={this.handleNameChange}/>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input type="email"
                                       id="emailInput"
                                       value={this.state.email}
                                       className={"form-control " + this.emailStateClass}
                                       aria-describedby="emailHelp"
                                       onKeyDown={this.handleEmailKeyDown}
                                       onChange={this.handleEmailChange}
                                       onFocus={this.handleEmailFocused}
                                       onBlur={this.handleEmailBlurred}
                                />
                                <div id="emailHelp" className="form-text">
                                    It's optional. But we advice to enter your email to restore access
                                    to the chat in the future.
                                </div>
                                <div className="invalid-feedback">
                                    The email must be valid or empty.
                                </div>
                            </div>
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

    get emailStateClass() {
        if (this.state.emailState === EmailState.VALID) {
            return 'is-valid';
        } else if (this.state.emailState === EmailState.INVALID) {
            return 'is-invalid';
        }
        return '';
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

    handleEmailFocused() {
        if (this.state.emailState === EmailState.EMPTY) {
            this.setState({emailState: EmailState.TYPING_EMPTY});
        } else if (this.state.emailState === EmailState.VALID) {
            this.setState({emailState: EmailState.TYPING_VALID});
        } else if (this.state.emailState === EmailState.INVALID) {
            this.setState({emailState: EmailState.TYPING_INVALID});
        }
    }

    handleEmailBlurred() {
        if (this.state.emailState === EmailState.TYPING_EMPTY) {
            this.setState({emailState: EmailState.EMPTY});
        } else if (this.state.emailState === EmailState.TYPING_VALID) {
            this.setState({emailState: EmailState.VALID});
        } else if (this.state.emailState === EmailState.TYPING_INVALID) {
            this.setState({emailState: EmailState.INVALID});
        }
    }

    handleEmailChange(event) {
        const newEmail = event.target.value;
        let newEmailState;
        if (newEmail.length === 0) {
            newEmailState = EmailState.TYPING_EMPTY;
        } else if (isValidEmail(newEmail)) {
            newEmailState = EmailState.TYPING_VALID;
        } else {
            newEmailState = EmailState.TYPING_INVALID;
        }
        this.setState({email: newEmail, emailState: newEmailState});
    }

    handleEmailKeyDown(event) {
        // prevent if event.key is whitespace character
        if (event.key.match(/\s/)) {
            event.preventDefault();
        }
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
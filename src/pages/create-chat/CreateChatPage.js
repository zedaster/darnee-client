import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import {createEnum} from "../../utils/enum";
import {isValidEmail, isValidName} from "../../services/validator";

const NameState = createEnum(['EMPTY', 'TYPING_EMPTY', 'TYPING_VALID', 'VALID', 'INVALID']);
const EmailState = createEnum(['EMPTY', 'TYPING_EMPTY', 'TYPING_INVALID', 'TYPING_VALID', 'VALID', 'INVALID']);

export default class CreateChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            nameState: NameState.EMPTY,
            emailState: EmailState.EMPTY,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameFocused = this.handleNameFocused.bind(this);
        this.handleNameBlurred = this.handleNameBlurred.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailFocused = this.handleEmailFocused.bind(this);
        this.handleEmailBlurred = this.handleEmailBlurred.bind(this);
    }

    render() {
        return (
            <PageFlexBase showBackButton>
                <div className="centered-page">
                    <div className="centered-page-content centered-page-full-width">
                        <h3 className="mb-4 text-center">A bit more to start</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Your name</label>
                                <input type="text"
                                       id="nameInput"
                                       value={this.state.name}
                                       className={"form-control " + this.nameStateClass}
                                       onChange={this.handleNameChange}
                                       onFocus={this.handleNameFocused}
                                       onBlur={this.handleNameBlurred}
                                />
                                <div className="invalid-feedback">
                                    The name must contain between 1 and 32 characters of a-z, A-Z, 0-9 and space.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input type="email"
                                       id="emailInput"
                                       value={this.state.email}
                                       className={"form-control " + this.emailStateClass}
                                       aria-describedby="emailHelp"
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
                            <button type="submit" className="btn btn-primary w-100"
                                    disabled={this.isButtonDisabled}>Let's go!
                            </button>
                        </form>
                    </div>
                </div>
            </PageFlexBase>
        )
    }

    get nameStateClass() {
        if (this.state.nameState === NameState.VALID) {
            return 'is-valid';
        } else if (this.state.nameState === NameState.INVALID) {
            return 'is-invalid';
        }
        return '';
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
        // TODO: Correct this
        return !enabledNameStates.includes(this.state.nameState) ||
            !enabledEmailStates.includes(this.state.emailState);
    }

    handleNameFocused() {
        if (this.state.nameState === NameState.INVALID) return;
        if (this.state.name.length === 0) {
            this.setState({nameState: NameState.TYPING_EMPTY});
        } else {
            this.setState({nameState: NameState.TYPING_VALID});
        }
    }

    handleNameBlurred() {
        const newName = this.state.name.trimEnd();
        if (this.state.nameState === NameState.TYPING_VALID) {
            this.setState({name: newName, nameState: NameState.VALID})
        } else if (this.state.nameState === NameState.TYPING_EMPTY) {
            this.setState({name: newName, nameState: NameState.EMPTY})
        }
    }

    handleNameChange(event) {
        const newName = event.target.value.trimStart().replace(/\s\s+/g, ' ');
        const checkName = newName.trimEnd();
        if (checkName.length === 0) {
            this.setState({name: newName, nameState: NameState.TYPING_EMPTY});
            return;
        }

        // set isNameValid to false if the name doesn't contain between 1 and 32 characters of a-z, A-Z, 0-9 and space)
        if (!isValidName(checkName)) {
            this.setState({name: newName, nameState: NameState.INVALID});
            return;
        }

        this.setState({name: newName, nameState: NameState.TYPING_VALID});
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
        const newEmail = event.target.value.trim();
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
}
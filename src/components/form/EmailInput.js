import {Component} from "react";
import {createEnum} from "../../utils/enum";
import {isValidEmail} from "../../utils/validator";

export const EmailState = createEnum(['EMPTY', 'TYPING_EMPTY', 'TYPING_INVALID', 'TYPING_VALID', 'VALID', 'INVALID']);

export class EmailInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailState: EmailState.EMPTY,
        }
        this.handleEmailFocused = this.handleEmailFocused.bind(this);
        this.handleEmailBlurred = this.handleEmailBlurred.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailKeyDown = this.handleEmailKeyDown.bind(this);
    }

    render() {
        return (
            <div className={this.props.className}>
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

    handleEmailFocused() {
        if (this.state.emailState === EmailState.EMPTY) {
            this.setState({emailState: EmailState.TYPING_EMPTY});
            this.props.onInputChange(this.state.email, EmailState.TYPING_EMPTY);
        } else if (this.state.emailState === EmailState.VALID) {
            this.setState({emailState: EmailState.TYPING_VALID});
            this.props.onInputChange(this.state.email, EmailState.TYPING_VALID);
        } else if (this.state.emailState === EmailState.INVALID) {
            this.setState({emailState: EmailState.TYPING_INVALID});
            this.props.onInputChange(this.state.email, EmailState.TYPING_INVALID);
        }
    }

    handleEmailBlurred() {
        if (this.state.emailState === EmailState.TYPING_EMPTY) {
            this.setState({emailState: EmailState.EMPTY});
            this.props.onInputChange(this.state.email, EmailState.EMPTY);
        } else if (this.state.emailState === EmailState.TYPING_VALID) {
            this.setState({emailState: EmailState.VALID});
            this.props.onInputChange(this.state.email, EmailState.VALID);
        } else if (this.state.emailState === EmailState.TYPING_INVALID) {
            this.setState({emailState: EmailState.INVALID});
            this.props.onInputChange(this.state.email, EmailState.INVALID);
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
        this.props.onInputChange(newEmail, newEmailState);
    }

    handleEmailKeyDown(event) {
        // prevent if event.key is whitespace character
        if (event.key.match(/\s/)) {
            event.preventDefault();
        }
    }
}
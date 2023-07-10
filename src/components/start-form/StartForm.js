import {Component} from "react";
import {NameInput, NameState} from "./NameInput";
import {EmailInput, EmailState} from "./EmailInput";
import AuthService from "../../services/AuthService";

export class StartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            nameState: NameState.EMPTY,
            emailState: EmailState.EMPTY,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <NameInput className="mb-3" onInputChange={this.handleNameChange} />
                <EmailInput className="mb-3" onInputChange={this.handleEmailChange} />
                <button type="submit"
                        className="btn btn-primary w-100"
                        disabled={this.isButtonDisabled}>
                    Let's go!
                </button>
            </form>
        )
    }

    get isButtonDisabled() {
        const enabledNameStates = [NameState.VALID, NameState.TYPING_VALID];
        const enabledEmailStates = [EmailState.VALID, EmailState.TYPING_VALID, EmailState.EMPTY, EmailState.TYPING_EMPTY];
        return this.props.isSubmitting ||
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
        this.props.onFormSubmit({name: this.state.name, email: this.state.email});
    }
}
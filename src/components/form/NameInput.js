import {createEnum} from "../../utils/enum";
import {Component} from "react";
import {isValidName} from "../../utils/validator";

export const NameState = createEnum(['EMPTY', 'TYPING_EMPTY', 'TYPING_VALID', 'VALID', 'INVALID']);

export class NameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameState: NameState.EMPTY,
        }
        this.handleNameFocused = this.handleNameFocused.bind(this);
        this.handleNameBlurred = this.handleNameBlurred.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    render() {
        const inputId = this.props.inputId || 'nameInput';
        return (
            <div className={this.props.className}>
                <label htmlFor={inputId} className="form-label">Your name</label>
                <input type="text"
                       id={inputId}
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

    handleNameFocused() {
        let newState;
        if (this.state.nameState === NameState.INVALID) return;
        if (this.state.name.length === 0) {
            newState = NameState.TYPING_EMPTY;
        } else {
            newState = NameState.TYPING_VALID;
        }
        this.setState({nameState: newState})
        this.props.onInputChange(this.state.name, newState);
    }

    handleNameBlurred() {
        const newName = this.state.name.trimEnd();
        if (this.state.nameState === NameState.TYPING_VALID) {
            this.setState({name: newName, nameState: NameState.VALID})
            this.props.onInputChange(this.state.name, NameState.VALID);
        } else if (this.state.nameState === NameState.TYPING_EMPTY) {
            this.setState({name: newName, nameState: NameState.EMPTY})
            this.props.onInputChange(this.state.name, NameState.EMPTY);
        }
    }

    handleNameChange(event) {
        const newName = event.target.value.trimStart().replace(/\s\s+/g, ' ');
        let newState;
        const checkName = newName.trimEnd();
        if (checkName.length === 0) {
            newState = NameState.TYPING_EMPTY;
        } else if (!isValidName(checkName)) {
            newState = NameState.INVALID;
        } else {
            newState = NameState.TYPING_VALID;
        }
        this.setState({name: newName, nameState: newState})
        this.props.onInputChange(newName, newState);
    }
}
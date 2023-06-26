import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";
import '../../assets/css/CenteredPage.css';

export default class RestoreChatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccessful: null,
        }
        this.restoreChats = this.restoreChats.bind(this)
    }

    get emailInputClassName() {
        const className = "form-control"
        if (this.state.isSuccessful == null) {
            return className
        }
        if (this.state.isSuccessful) {
            return className + " is-valid"
        }
        return className + " is-invalid"
    }

    get formTextClassName() {
        const className = "form-text"
        if (this.state.isSuccessful != null) return className + " d-none"
        return className
    }

    render() {
        return (
            <PageFlexBase showBackButton>
                <div className="centered-page">
                    <div className="centered-page-content">
                        <h3 className="mb-4 text-center">Restore your chats</h3>
                        {/* TODO: Create form */}
                        <form className="centered-page-full-width">
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input type="email" className={this.emailInputClassName} id="emailInput"
                                       aria-describedby="emailHelp" required/>
                                <div className="valid-feedback">
                                    Information has been sent to the email
                                </div>
                                <div className="invalid-feedback">
                                    {/* TODO: Replace to exact message */}
                                    Something wrong happened
                                </div>
                                <div id="emailHelp" className={this.formTextClassName}>
                                    We'll send you letter with link to chats
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" onClick={this.restoreChats}>
                                Send letter with chats
                            </button>
                        </form>
                    </div>
                </div>
            </PageFlexBase>
        )
    }

    restoreChats(event) {
        event.preventDefault()
        this.setState({isSuccessful: true})
    }
}
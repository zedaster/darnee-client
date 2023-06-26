import {Component} from "react";
import PageFlexBase from "../../components/flex-base/PageFlexBase";

export default class JoinChatPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageFlexBase>
                <div className="centered-page">
                    <div className="centered-page-content">
                        <h3 className="mb-4 text-center">You are almost in the chat</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Your name</label>
                                <input type="text" className="form-control" id="nameInput" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input type="email" className="form-control" id="emailInput"
                                       aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">It's optional. But we advice to enter your
                                    email to restore access to the chat in the future.
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Let's go!</button>
                        </form>
                    </div>
                </div>
            </PageFlexBase>
        )
    }
}
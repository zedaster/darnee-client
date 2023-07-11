import {Component} from "react";
import '../../assets/css/HomePage.css';
import '../../assets/css/CenteredPage.css';
import {Link} from "react-router-dom";
import PageFlexBase from "../../components/flex-base/PageFlexBase";

class HomePage extends Component {
    render() {
        return (
            <PageFlexBase>
                <div className="centered-page">
                    <div className="centered-page-content">
                        <h3 className="text-center">Activate your Darnee chat room swiftly and join its members by
                            link</h3>
                        <div className="button-container my-4">
                            <Link to="create-chat">
                                <button type="button" className="btn btn-success">Create a new chat room</button>
                            </Link>
                            {/*<Link to="restore-chats">*/}
                            {/*    <button type="button" className="btn btn-primary">Restore your chats</button>*/}
                            {/*</Link>*/}

                        </div>
                        <p className="text-muted text-center mt-3 mb-0">If a room has been inactive for 30 days, it removes
                            automatically.</p>
                    </div>
                </div>
            </PageFlexBase>
        )
    }
}

export default HomePage;
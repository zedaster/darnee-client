import {Component} from "react";
import '../../assets/css/HomePage.css';
import {Link} from "react-router-dom";
import PageFlexBase from "../../components/flex-base/PageFlexBase";

class HomePage extends Component {
    render() {
        return (
            <PageFlexBase>
                <div className="home-page">
                    <div className="home-content my-5">
                        <p className="lead text-center">Activate your Darnee chat room swiftly and join its members by
                            link</p>
                        <div className="button-container my-4">
                            <button type="button" className="btn btn-success">Create a new chat room</button>
                            <Link to="chat">
                                <button type="button" className="btn btn-primary">Open your rooms</button>
                            </Link>

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
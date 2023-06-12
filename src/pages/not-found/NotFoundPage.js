import {Component} from "react";
import '../../assets/css/HomePage.css';
import {Link} from "react-router-dom";
import PageFlexBase from "../../components/flex-base/PageFlexBase";

class NotFoundPage extends Component {
    render() {
        return (
            <PageFlexBase>
                <div className="home-page">
                    <div className="home-content my-5">
                        <p className="lead text-center">Page not found</p>
                        <div className="button-container my-4">
                            <Link to="/">
                                <button type="button" className="btn btn-primary">Back to main page</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </PageFlexBase>
        )
    }
}

export default NotFoundPage;
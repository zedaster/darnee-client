import {Component} from "react";
import '../../assets/css/HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <div className="home-content">
                    <p className="lead text-center">Activate your Darnee chat room swiftly and join its members by link</p>
                    <div className="button-container my-4">
                        <button type="button" className="btn btn-success">Create a new chat room</button>
                        <button type="button" className="btn btn-primary">Open an existing room</button>
                    </div>
                    <p className="text-muted text-center mt-3">If your room has been inactive for 30 days, it removes automatically.</p>
                </div>
            </div>
        )
    }
}

export default HomePage;
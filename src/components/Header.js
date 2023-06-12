import {Component} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft} from "react-bootstrap-icons";
import "../assets/css/Header.css"

class Header extends Component {
    constructor(props) {
        super(props);
        this.navBarContentClass = "navbar-content";
        if (this.props.showBackButton) {
            this.navBarContentClass += " with-back-button";
        }
    }
    render() {
        let navBarContent = [<Link className="navbar-brand" to="/">Darnee</Link>]
        if (this.props.showBackButton) {
            const backButton = <Link to="/"><ArrowLeft size="1.25rem" /></Link>
            const nothingForRight = <span className="nothing-for-right"></span>
            navBarContent = [backButton, ...navBarContent, nothingForRight]
        }
        return (
            <header>
                <nav className="navbar bg-light">
                    <div className="container">
                        <div className={this.navBarContentClass}>
                            {navBarContent}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
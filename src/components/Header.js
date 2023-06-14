import {Component} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft, Link45deg} from "react-bootstrap-icons";
import "../assets/css/Header.css"
import CopyLinkButton from "./copy-link-button/CopyLinkButton";

class Header extends Component {
    constructor(props) {
        super(props);
        this.navBarContentClass = "navbar-content";
        if (this.props.showBackButton) {
            this.navBarContentClass += " with-back-button";
        }
        this.onLinkButtonPressed = this.onLinkButtonPressed.bind(this);
    }
    render() {
        let navBarContent = [<Link className="navbar-brand" to="/">Darnee</Link>]
        if (this.props.showBackButton) {
            const backButton = <Link to="/"><ArrowLeft size="1.25rem" /></Link>
            if (this.props.linkButtonResource) {
                // TODO: Extract the link button to other component
                const linkButton = <CopyLinkButton link={this.props.linkButtonResource} />
                navBarContent = [backButton, ...navBarContent, linkButton]
            } else {
                const nothingForEdge = <span className="nothing-for-edge"></span>
                navBarContent = [backButton, ...navBarContent, nothingForEdge]
            }
        }
        return (
            <header>
                <nav className="navbar bg-light">
                    <div className="container justify-content-center">
                        <div className={this.navBarContentClass}>
                            {navBarContent}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    onLinkButtonPressed(event) {
        event.preventDefault();
        this.props.onLinkButtonPressed(event);
    }
}

export default Header;
import {Component} from "react";

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar bg-light">
                    <div className="d-flex justify-content-center w-100">
                        <a className="navbar-brand" href="#">Darnee</a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
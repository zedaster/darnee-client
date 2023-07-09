import {Component} from "react";
import Header from "../Header";
import "../../assets/css/PageFlexBase.css"

class PageFlexBase extends Component {
    render() {
        // TODO: Add loading line to the bottom of the page
        return (
            <div className="flex-base">
                <div className="header-wrapper">
                    <Header showBackButton={this.props.showBackButton} linkButtonResource={this.props.linkButtonResource} />
                </div>
                <div className="container app-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageFlexBase;
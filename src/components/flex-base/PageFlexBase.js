import {Component} from "react";
import Header from "../Header";
import "../../assets/css/PageFlexBase.css"

class PageFlexBase extends Component {
    render() {
        let content
        if (this.props.isLoading) {
            content = (
                <div className="centered-page">
                    <div className="centered-page-content">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>)
        } else {
            content = this.props.children
        }

        return (
            <div className="flex-base">
                <div className="header-wrapper">
                    <Header showBackButton={this.props.showBackButton}
                            linkButtonResource={this.props.linkButtonResource}/>
                </div>
                <div className="container app-content">
                    {content}
                </div>
            </div>
        )
    }
}

export default PageFlexBase;
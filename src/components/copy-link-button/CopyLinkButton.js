import {Component} from "react";
import {Link45deg} from "react-bootstrap-icons";
import {Popover} from "bootstrap";

class CopyLinkButton extends Component {
    constructor(props) {
        super(props);
        this.onLinkButtonPressed = this.onLinkButtonPressed.bind(this)
    }
    render() {
        return (<a
            id="link-button"
            onClick={this.onLinkButtonPressed}
            href="">
                <Link45deg size="1.25rem"/>
        </a>)
    }

    componentDidMount() {
        const linkButton = document.getElementById('link-button')
        this.popover = new Popover(linkButton, {
            placement: "bottom",
            content: "Link to the chat copied!",
            trigger: "manual"
        });
    }

    onLinkButtonPressed(event) {
        event.preventDefault();
        navigator.clipboard.writeText(this.props.link).then(() => {
            this.popover.show()
            setTimeout(() => {
                this.popover.hide()
            }, 1000)
        });
    }
}

export default CopyLinkButton;
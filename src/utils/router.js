import {useNavigate} from 'react-router';
import {useParams} from "react-router-dom";

export function withRouterNavigate(Component){
    return (props) => {
        const navigate = useNavigate();
        return <Component navigate={navigate} {...props} />
    };
}

export function withRouterParams(Component) {
    return (props) => {
        const params = useParams();
        return <Component params={params} {...props} />
    };
}
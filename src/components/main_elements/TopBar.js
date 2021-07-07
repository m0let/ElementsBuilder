import {Link} from "react-router-dom";
const TopBar = ({name, to}) => {
    return (
        <li className="nav-item">
            <Link to={to} className="nav-link" style={{ fontWeight: 500 }}>
                {name}
            </Link>
        </li>

    )
}

export default TopBar
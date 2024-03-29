
import { Link } from "react-router-dom";
import Account from "./Account";
import classes from "../styles/Nav.module.css";
import logo from "../assets/images/logo-bg.png";

export default function Nav() {

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to="/" className={classes.brand}>
                        <img src={logo} alt="Quiz App Logo" />
                        <h3>Quiz Application</h3>
                    </Link>
                </li>
            </ul>
            <Account />
        </nav>
    );

}
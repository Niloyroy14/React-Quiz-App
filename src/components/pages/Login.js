
import classes from "../../styles/Login.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import Illustration from "../Illustration";
import Form from "../Form";

export default function Login() {
    return (
        <div>
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration />
                <Form className={`${classes.login}`}>
                    <TextInput type="text" placeholder="Enter email" icon="alternate_email" />
                    <TextInput type="password" placeholder="Enter password" icon="lock" />
                    <Button><span>Submit now</span></Button>
                    <div className="info">
                        Don't have an account? <a href="signup.html">Signup</a> instead.
                    </div>
                </Form>
            </div>
        </div>
    );
}
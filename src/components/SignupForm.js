import Form from "./Form";
import Button from "./Button";
import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignupForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { signUp } = useAuth();
    const navigate  = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        
        //do validation

        if (password !== confirmPassword) {
            return setError("Password don't match!");
        }

        try {
            setError("");
            setLoading(true);
            await signUp(email, password, username);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to create an account!");
        }

    }
    
    return (
        <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                required value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name"
                icon="person" />
            
            <TextInput
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                icon="alternate_email" />
            
            <TextInput
                type="password"
                required value={password}
                onChange={(e) => setPasword(e.target.value)}
                placeholder="Enter password"
                icon="lock" />
            
            <TextInput
                type="password"
                required value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                icon="lock_clock" />
            
            <CheckBox
                required text="I agree to the Terms &amp; Conditions"
                value={agree}
                onChange={(e) => setAgree(e.target.value)} />
            
            <Button disabled={loading} type="submit">
                <span>Submit now</span>
            </Button>

            {error && <p className="error"> {error} </p> }

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );

}
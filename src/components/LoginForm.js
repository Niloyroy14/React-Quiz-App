import Form from "./Form";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function LoginForm() {

   
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
   

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to login!");
        }

    }

    return (
        <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" icon="alternate_email" />
            
            <TextInput
                type="password"
                required value={password}
                onChange={(e) => setPasword(e.target.value)}
                placeholder="Enter password" icon="lock" />
            
            <Button disabled={loading} type="submit">
                <span>Submit now</span>
            </Button>

            {error && <p className="error"> {error} </p>}

            <div className="info">
                Don't have an account? <Link to="/signup">Signup</Link> instead.
            </div>
        </Form>
    );
}
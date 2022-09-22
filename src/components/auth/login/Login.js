// Login component --
// will have a form with email and password
// handle validation for wrong email or password

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {loginUser} from "../../../utils/http-utils/user-requests";
import {useNavigate} from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setUser( (prevState) => {
            return {...prevState, [event.target.name]:event.target.value}
        } )
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        loginUser(user).then(() => {
            navigate('/users-list')
        }).catch(error => setError(error.message))
    }


    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                {error && <span className="text-danger">{error}</span>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./UserForm.scss";
import {useEffect, useState} from "react";
import {getUserById, saveUser} from "../../../utils/http-utils/user-requests";
import {useNavigate, useParams} from "react-router-dom";

export function UserForm() {

    const params = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        isActive: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        address: ''
    });

    // Update User
    useEffect(() => {
        if(params.id) {
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }
    }, [params.id]);

    // Create User
    const onFormSubmit = async (event) => {
        // event -- native event from the browser
        event.preventDefault();
        await saveUser(user);
        navigate('/users-list');
        console.log("Success Creating!")
    }

    const onInputChange = (event) => {
        // console.log(event)
        let value = event.target.value;
        if(event.target.name === 'isActive') {
            value = event.target.checked;
        }

        setUser( (prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
                // [event.target.name]: event.target.value
            }
        } )
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture" name="picture" value={user.picture} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" name="address" value={user.address} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Active" name="isActive" checked={user.isActive} onChange={onInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    );
}
//Since we know UserCard function will get as a parameter 
//a user we want to display, 
//we set "user" as a parameter

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom'; // Importing Hooks from react-touter-dom
import "./UserCard.scss";

export function UserCard({ user, deleteUser }) {

    const navigate = useNavigate();
    const redirectToDetails = () => {
        navigate(`/user/${user.id}`);
    };

    if (!user) {
        return <h2>No User!</h2>
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.picture} />
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                    <span className="key">Address: </span>
                    <span className="value">{user.address}</span>
                </Card.Text>
                <Card.Text>
                    <span className="key">Email: </span>
                    <span className="value">{user.email}</span>
                </Card.Text>
                <Card.Text>
                    <span className="key">Phone: </span>
                    <span className="value">{user.phone}</span>
                </Card.Text>
                <div className="btn-holder">
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                    <Button variant="info" onClick={redirectToDetails}>Details</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
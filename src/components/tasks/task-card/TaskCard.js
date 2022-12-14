import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {getLoggedUser} from "../../../utils/http-utils/user-requests";
import {TaskStatus} from "../../../utils/http-utils/task-requests";

export function TaskCard({ task, onTaskDelete, changeStatus }) {

    const loggedUser = getLoggedUser();

    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/task/edit/${task.id}`)
    }

    const getNextStateButton = () => {
        switch (task.status) {
            case TaskStatus.NEW:
                return <Button variant='warning' onClick={() => changeStatus(TaskStatus.IN_PROGRESS, task.id)}>Move to In In Progress</Button>
            case TaskStatus.IN_PROGRESS:
                return <Button variant='danger' onClick={() => changeStatus(TaskStatus.IN_REVIEW, task.id)}>Move to In Review</Button>
            case TaskStatus.IN_REVIEW:
                return <Button variant='success' onClick={() => changeStatus(TaskStatus.DONE, task.id)}>Move to Done</Button>
        }
    }

    return(
        <div className="task-card-wrapper">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        <span className="key">Author: </span>
                        <span className="value">{task.authorName}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Status: </span>
                        <span className="value">{task.status}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Created: </span>
                        <span className="value">{task.createdDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Due: </span>
                        <span className="value">{task.dueDate}</span>
                    </Card.Text>
                    <div className="btn-holder">
                        {/* if the user exists and is not the author of the task, the edit button will disappear */}
                        { loggedUser && loggedUser.id === task.authorId && <Button variant="primary" onClick={navigateToEdit}>Edit</Button>}
                        { loggedUser && loggedUser.id === task.authorId && <Button variant="danger" onClick={() => onTaskDelete(task.id)}>Delete</Button>}
                        { getNextStateButton() }
                    </div>
                </Card.Body>
            </Card>
        </div>
    );

}
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getTaskById, saveTask, TaskStatus} from "../../../utils/http-utils/task-requests";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./TaskForm.scss";

export function TaskForm() {

    const navigate = useNavigate();
    const params = useParams();
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: ""
    });

    // Update Task
    // the useEffect will send a request for the id,
    // if there is an id, then get it and display the data by setting a state in the task const
    useEffect(() => {
        if(params.id) { // by checking the URL, if there are parameters...
                                        // when get the task, save in the state
            getTaskById(params.id).then((response) => {
                setTask(response.data);
            });
        }
    }, [params.id]);
    // By adding params.id as an option to the array, the useEffect hook will execute everytime the id is changed.


    const onInputChange = (event) => {
        setTask( (prevState) => {
            return {...prevState, [event.target.name]: event.target.value}
            // get all that was before as values +==,== the new field and its value will come from event.target.value
        } );
    }

    // Create Task
    const onFormSubmit = (event) => {
        event.preventDefault();

        saveTask(task).then(() => {
            navigate('/tasks-list')
        });
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" name="title" value={task.title} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name="description" value={task.description} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Due Date" name="dueDate" value={task.dueDate} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select plaveholder="Select Status" name="status" value={task.status} onChange={onInputChange}>
                        { Object.keys(TaskStatus).map(status => <option key={status} value={TaskStatus[status]}>{TaskStatus[status]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {task.id ? "Edit Task" : "Create Task"}
                </Button>
            </Form>
        </div>
    );
}
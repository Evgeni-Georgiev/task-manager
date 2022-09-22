import {useEffect, useState} from "react";
import {TaskCard} from "../task-card/TaskCard";
import {deleteTask, getAllTasks, getTasksForAuthor, saveTask} from "../../../utils/http-utils/task-requests";
import "./TasksList.scss";
import {useParams} from "react-router-dom";

export function TasksList() {

    const [tasks, setTasks] = useState([]);
    const params = useParams();

    // useEffect(parameter1:callback function, parameter2:when we want the call back to execute -- [])
    useEffect( () => {
        if(params.id) {
            getTasksForAuthor(params.id).then(response => {
                setTasks(response.data);
            })
        }
        else {
            getAllTasks().then( response => {
                setTasks(response.data)
            });
        }
    }, [params.id]);

    const onDeleteHandler = async (id) => {
        // get the id of the task we want to delete.
        // delete the task async.
        await deleteTask(id); // waiting for the server to return a response that the task has been deleted.
        // re-render the state. The list will be re-display with the new list(missing the deleted task).
        setTasks( (prevState) => {
            return prevState.filter((task) => task.id !== id)
        } )
    }

    const changeStatusHandler = (status, id) => {
        // edit the status with the new status
        const task = tasks.find(task => task.id === id); // will get the new status
        task.status = status;
        saveTask(task).then(() => {
            setTasks([...tasks]);
        })
    }

    return(
        <div className="tasks-list-wrapper">
            { tasks.map(task => (
                <TaskCard key={task.id} task={task} onTaskDelete={onDeleteHandler} changeStatus={changeStatusHandler} />
            ))}
        </div>
    );
}
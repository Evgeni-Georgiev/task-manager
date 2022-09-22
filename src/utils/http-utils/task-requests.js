import axios from "axios";
import {getLoggedUser} from "./user-requests";

const apiUrl = "http://localhost:4004/tasks";

export const TaskStatus = {
    NEW: "New",
    IN_PROGRESS: "In Progress",
    IN_REVIEW: "In Review",
    DONE: "Done"
}

export function getAllTasks() {
    return axios.get(apiUrl);
}

export function getTasksForAuthor(authorId) {
    return axios.get(`${apiUrl}?authorId=${authorId}`)
}

export function getTaskById(taskId) {
    return axios.get(`${apiUrl}/${taskId}`)
}

export function deleteTask(taskId) {
    return axios.delete(`${apiUrl}/${taskId}`);
}

export function saveTask(task) {
    // create task
    if(!task.id) {
        const loggedUser = getLoggedUser();
        task.authorId = loggedUser.id;
        task.authorName = loggedUser.name;
        task.status = TaskStatus.NEW;
        task.createdDate = new Date().toDateString();
        task.dueDate = new Date(task.dueDate).toDateString();
        return axios.post(`${apiUrl}`, task);
    }

    // format dates when update
    task.createdDate = new Date(task.createdDate).toDateString();
    task.dueDate = new Date(task.dueDate).toDateString();

    // update task
    return axios.put(`${apiUrl}/${task.id}`, task);
}
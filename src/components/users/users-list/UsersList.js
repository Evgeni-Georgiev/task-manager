import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../utils/http-utils/user-requests";
import { UserCard } from "../user-card/UserCard";
import './UsersList.scss';

export function UsersList() {
    // useState([]) -- get the data from the API
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data); // 'users' will be updated and will now have an array of all users coming from the API
        });
    }, []);

    const deleteUserHandler = async (id) => {
        await deleteUser(id);
        setUsers(prevState => {
            return prevState.filter(user => user.id !== id)
        });
    }

    return (
        <div className="users-list-wrapper">
            {users.map(user => (
                <UserCard key={user.id} user={user} deleteUser={deleteUserHandler} />
            ))}
        </div>
    );
}
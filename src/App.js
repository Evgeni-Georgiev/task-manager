import './App.css';
import { Layout } from './components/layout/Layout';
import { Route, Routes } from "react-router-dom";
import {Register} from "./components/auth/register/Register";
import {UsersList} from "./components/users/users-list/UsersList";
import {User} from "./components/users/user/User";
import {UserForm} from "./components/users/user-form/UserForm";
import {Login} from "./components/auth/login/Login";
import {AuthenticatedRoute} from "./utils/guards/AuthenticatedRoute";
import {NonAuthenticatedGuard} from "./utils/guards/NonAuthenticatedGuard";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path="/register" element={<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard>} />
            <Route exact path="/login" element={<NonAuthenticatedGuard><Login/></NonAuthenticatedGuard>} />

            <Route exact path="/" element={<AuthenticatedRoute><Layout/></AuthenticatedRoute>} >
                <Route path="/users-list" element={<UsersList/>} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/user/create-user" element={<UserForm />} />
                <Route path="/user/edit/:id" element={<UserForm />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;

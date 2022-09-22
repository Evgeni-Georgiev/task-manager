import {getLoggedUser} from "../http-utils/user-requests";
import {Navigate} from "react-router-dom";

// Accept some props, of these props we will need "children"
// in order to know which component we want to render.
export function NonAuthenticatedGuard({ children }) {
    // get the logged-in user
    const loggedUser = getLoggedUser();

    // if user is logged, redirect only to nested routes in AuthenticatedRoutes
    // if user exists and is logged - do not have access to the login/register pages.
    if(loggedUser) {
        return <Navigate to="/users-list"/>
    }
    return children;
}
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/user-requests";

export function AuthenticatedRoute({ children }) {
    // children - props come from the route(AuthenticatedRoute) in App.js.
    const user = getLoggedUser();

    if(!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
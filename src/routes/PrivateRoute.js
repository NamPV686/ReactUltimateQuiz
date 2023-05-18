import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const PrivateRoute = (props) => {
    const { children } = props;
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to={"/login"}></Navigate>
    }

    return(
        <>
            {children}
        </>
    )
}

export default PrivateRoute;
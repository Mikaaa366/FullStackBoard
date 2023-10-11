import { useDispatch } from "react-redux";
import { API_AUTH_URL } from "../../../config";
import { logOut } from "../../../redux/userRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    const options = {
        method: 'DELETE',
    };

    fetch(`${API_AUTH_URL}/logout`, options)
        .then(() => {
            dispatch(logOut());
            navigate('/');
        });
    }, [dispatch]);

    return null;
};

export default LogoutPage;
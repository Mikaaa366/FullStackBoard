import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { removeAdvert } from "../../../redux/advertRedux";

const DeleteAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      dispatch(removeAdvert(id))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Błąd podczas usuwania ogłoszenia:', error);
      });
  }, [dispatch, id, navigate]);
    return (
        null
    )
};

export default DeleteAdd;
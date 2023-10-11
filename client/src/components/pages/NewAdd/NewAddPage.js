import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import AdvertForm from "../../features/AdvertForm/AdvertForm";
import { addAdvert } from "../../../redux/advertRedux";

const NewAddPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = localStorage.getItem('loggedInUser');
    //const [login, setLogin] = useState('');
    const currentUserString = currentUser;
    const currentUserObject = JSON.parse(currentUserString);

    const login = currentUserObject.login;

    /*for (const key in currentUserObject) {
        if (currentUserObject.hasOwnProperty(key)) {
            const loginValue = currentUserObject[key];
            console.log(loginValue); 
            setLogin(loginValue);
        }
    }*/

    const handleAddAdvert = async advert => {
        const formData = new FormData();
        formData.append('title', advert.title);
        formData.append('content', advert.content);
        formData.append('location', advert.location);
        formData.append('photo', advert.photo);
        formData.append('price', advert.price);
        formData.append('publish_date', advert.publish_date);
        formData.append('seller', login);
        try {
            const response = await dispatch(addAdvert(formData));

            console.log('Advert: ', response);
            navigate('/');
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div>
            <AdvertForm actionText='Post new advertisement' action={handleAddAdvert} />
        </div>
    )
};

export default NewAddPage;
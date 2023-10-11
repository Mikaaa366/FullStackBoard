import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editAdvert, getAdsById } from "../../../redux/advertRedux";
import AdvertForm from "../../features/AdvertForm/AdvertForm";

const EditAddPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const advert = useSelector(state => getAdsById(state, id));

    const handleEdit = async advert => {
        const formData = new FormData();
        formData.append('title', advert.title);
        formData.append('content', advert.content);
        formData.append('location', advert.location);
        formData.append('photo', advert.photo);
        formData.append('price', advert.price);
        formData.append('publish_date', advert.publish_date);
        
        try {
            const response = await dispatch(editAdvert(formData));
            navigate('/');
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    
    return (
        <div>
            <AdvertForm 
            actionText='Edit your advertisement' 
            action={handleEdit} 
            title={advert.title}
            content={advert.content}
            location={advert.location}
            photo={advert.photo}
            price={advert.price}
            publish_date={advert.publish_date}
            />
        </div>
    )
};

export default EditAddPage;
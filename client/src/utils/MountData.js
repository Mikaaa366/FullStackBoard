import { useDispatch } from "react-redux";
import { loadAdvertsRequest } from "../redux/advertRedux";
import { useEffect, useState } from "react";

const MountData = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(loadAdvertsRequest());
                setLoading(false);
            } catch (e) {
                console.error('Error loading data:', e.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    return { loading };
};

export default MountData;
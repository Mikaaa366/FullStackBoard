import { API_URL } from '../config';
import axios from 'axios';
import initialState from './initialState';


//Selectors
export const getAllAds = ({ ads }) => ads;
export const getRequest = ({ ads }) => ads.request;
export const getAdsById = ({ ads }, id) => ads.data.find((ad) => ad._id === id)

//Actions
const createActionName = actionName => `app/advert/${actionName}`;

const LOAD_ADVERTS = createActionName('LOAD_ADVERTS');
const ERROR = createActionName('ERROR');
const POSTADD = createActionName('POSTADD');
const EDITADD = createActionName('EDITADD');
const REMOVEADD = createActionName('REMOVEADD');
const SEARCHADD = createActionName('SEARCHADD');


export const loadAdverts = (payload) => ({ type: LOAD_ADVERTS, payload });
export const error = (payload) => ({ type: ERROR, payload });
export const postAdd = payload => ({ type: POSTADD, payload });
export const editAdd = payload => ({ type: EDITADD, payload });
export const removeAdd = payload => ({ type: REMOVEADD, payload });
export const searchAdd = payload => ({ type: SEARCHADD, payload });


//Thunk
export const loadAdvertsRequest = () => async (dispatch) => {
    try {
      const res = await axios.get(`${API_URL}/ads`);
      
     await dispatch(loadAdverts(res.data));
    } catch (e) {
      dispatch(error(e.message));
    }
  };

export const addAdvert = (formData) => async (dispatch) => {
  try {
    const options = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    };
    const response = await axios.post(`${API_URL}/ads`, formData, options, { withCredentials: true });

    dispatch(loadAdvertsRequest());

    return response.data;
  } catch (e) {
    dispatch(error(e.message));
    throw e;
  }
  /*try {
    await axios.post(`${API_URL}/ads`, advert, { withCredentials: true });
    dispatch(loadAdvertsRequest());
  } catch (e) {
    dispatch(error(e.message));
  }*/
};

export const editAdvert = (advert, id) => async (dispatch) => {
  try {
    const options = {
      method: 'PUT',
      body: advert,
      credentials: 'include',
    };
    
    await axios.put(`${API_URL}/ads/${id}`, advert, options);

    dispatch(loadAdvertsRequest());
  } catch (e) {
    dispatch(error(e.message));
    throw e;
  }
};

export const removeAdvert = (id) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    await axios.delete(`${API_URL}/ads/${id}`, options);

    dispatch(loadAdvertsRequest());
  } catch (e) {
    dispatch(error(e.message));
    throw e;
  }
};

export const searchAdvert = (searchPhrase) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);
    const results = response.data;
    dispatch(loadAdverts(results));
  } catch (e) {
    dispatch(error(e.message));
    throw e;
  }
}

const advertReducer = (statePart = initialState.ads, action) => {
    switch (action.type) {
        case LOAD_ADVERTS: 
        console.log('LOAD_ADVERTS action payload:', action.payload);
            return { ...statePart, data: action.payload };
        case ERROR:
            return { ...statePart, error: action.payload };
        case POSTADD:
            return {...statePart, data: [...statePart.data, action.payload] };
        case EDITADD:
            return {...statePart, data: statePart.data.map(advert => advert._id === action.payload._id ? action.payload : advert)};
        case REMOVEADD:
            return {...statePart, data: statePart.data.filter(advert => advert.id !== action.payload)};
        case SEARCHADD:
            return statePart.filter(advert => advert.title.includes(action.payload) || advert.content.includes(action.payload) || advert.location.includes(action.payload) || advert.seller.includes(action.payload));
        default:
            return statePart;
    };
};

export default advertReducer;
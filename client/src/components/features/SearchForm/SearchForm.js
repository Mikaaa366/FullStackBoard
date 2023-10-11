import { useEffect, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadAdvertsRequest } from '../../../redux/advertRedux';

const SearchForm = ({ onSearch }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAdvertsRequest());
    }, [dispatch]);
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSearch = () => {
        const searchUrl = `/search/${encodeURIComponent(searchTerm)}`;
        navigate(searchUrl);
    };
    
    return (
        <Form inline className="col-12 col-sm-3 mx-auto d-flex align-items-center justify-content-between">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-2 rounded-pill form-control-sm" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="outline-success"
          className="rounded-pill mt-2 mt-sm-0 ms-2" 
          onClick={handleSearch}
        >
          Search
        </Button>
      </Form>
    );
};

export default SearchForm;
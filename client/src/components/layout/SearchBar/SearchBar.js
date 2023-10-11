import SearchForm from "../../features/SearchForm/SearchForm";

const SearchBar = () => {
    const handleSearch = (searchTerm) => {
        console.log('Wyszukano:', searchTerm);
    };

    return (
        <div>
          <SearchForm onSearch={handleSearch} />
        </div>
      );
    
};

export default SearchBar;
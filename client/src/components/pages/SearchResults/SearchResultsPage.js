import { useSelector } from "react-redux"
import { getAllAds } from "../../../redux/advertRedux"
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import AdvertBox from "../../features/AdvertBox/AdvertBox";


const SearchResultsPage = () => {
    const adverts = useSelector(state => getAllAds(state));
    const { searchPhrase } = useParams();
    const searchPhraseLower = searchPhrase.toLowerCase();
    console.log('adData: ', adverts.data)

    const filtered = Object.values(adverts.data).filter(advert => 
        advert.title.toLowerCase().includes(searchPhraseLower) || 
        advert.content.toLowerCase().includes(searchPhraseLower) ||
        advert.location.toLowerCase().includes(searchPhraseLower)
    );
        console.log('fil: ', filtered);
    
    if (filtered.length === 0) {
        return(
            <Container>
                <h1>The search phrase is: &quot;{searchPhrase}&quot;</h1>
                <h2>Match didn&apos;t found</h2>
            </Container>
        );
    } else
    return (
        <Container>
            <h1>The search phrase is: &quot;{searchPhrase}&quot;</h1>
            <Row>
                {filtered.map(advert => (
                    <div key={advert._id} className='col-12 col-sm-6 col-lg-4'>
                        <AdvertBox advert = {advert} />
                    </div>
                ))};
            </Row>
        </Container>
    );
};

export default SearchResultsPage;
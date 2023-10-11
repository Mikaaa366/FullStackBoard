import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { Container } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";

const MainLayout = ({ children }) => {
    return (
    <Container>
        <Header />
        <SearchBar />
        {children}
        <Footer />
    </Container>
    );
};

export default MainLayout;
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/pages/HomePage/HomePage';
import { Container } from 'reactstrap';
import SingleAddPage from './components/pages/SingleAdd/SingleAddPage';
import NewAddPage from './components/pages/NewAdd/NewAddPage';
import EditAddPage from './components/pages/EditAdd/EditAddPage';
import SearchResultsPage from './components/pages/SearchResults/SearchResultsPage';
import LoginPage from './components/pages/Login/LoginPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import NotFoundPage from './components/pages/NotFound/NotFoundPage';
import LogoutPage from './components/pages/Logout/LogoutPage';
import DeleteAdd from './components/pages/DeleteAdd/DeleteAdd';

const App = () => {
  return (
    <Container>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ads/:id' element={<SingleAddPage />} />
          <Route path='/ads/add' element={<NewAddPage />} />
          <Route path='/ads/edit/:id' element={<EditAddPage />} />
          <Route path='/ads/delete/:id' element={<DeleteAdd />} />
          <Route path='/search/:searchPhrase' element={<SearchResultsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
  </Container>
  );
};

export default App;

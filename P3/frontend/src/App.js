import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import SignUpSeeker from './pages/SignUpSeeker/SignUpSeeker';
import SignUpShelter from './pages/SignUpShelter/SignUpShelter';
import { Login } from './pages/LogIn/LogIn';
import Layout from './components/Layout'
import NotFound from './pages/NotFound';
import ApplicationForm from './pages/ApplicationForm';
import ShelterDetail from './pages/ShelterDetail';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-up/" element={<SignUp />} />
        <Route path="sign-up-seeker/" element={<SignUpSeeker />} />
        <Route path="sign-up-shelter/" element={<SignUpShelter />} />
        <Route path="log-in/" element={<Login />} />
        <Route path="application/form" element={<ApplicationForm />} />
        <Route path="shelter/:shelterId/:shelterName" element={<ShelterDetail />} />
        <Route path="*" element={<NotFound />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
  );
  
}

export default App;

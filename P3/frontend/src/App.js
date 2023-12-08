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
import LogOut from './pages/LogOut/LogOut';
import Layout from './components/Layout'
import NotFound from './pages/NotFound';
import ApplicationForm from './pages/ApplicationForm';
import { ViewProfileSeeker } from './pages/Profile/ViewProfileSeeker'; 

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
        <Route path="log-out/" element={<LogOut />} />
        <Route path="profile/" element={<ViewProfileSeeker />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="application/form" element={<ApplicationForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
  
}

export default App;

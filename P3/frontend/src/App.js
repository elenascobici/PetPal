import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import { Login } from './pages/LogIn/LogIn';
import Layout from './components/Layout'
import NotFound from './pages/NotFound';
import ApplicationForm from './pages/ApplicationForm';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign-up/" element={<SignUp />} />
        <Route path="log-in/" element={<Login />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="application/form" element={<ApplicationForm />} />
        <Route path="*" element={<NotFound />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
  );
  
}

export default App;

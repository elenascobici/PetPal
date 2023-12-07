import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
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
        <Route path="*" element={<NotFound />} /> 
        <Route path="application/form" element={<ApplicationForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
  
}

export default App;

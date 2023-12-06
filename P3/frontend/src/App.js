import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
  );
  
}

export default App;

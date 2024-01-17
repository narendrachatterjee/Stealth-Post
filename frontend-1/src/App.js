
import './output.css';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Home from './routes/home';
import Login from './routes/Login';
import ForgotPassword from './routes/forgotPassword';
import Signup from './routes/Signup';
import Welcome from './routes/welcome';
import { useCookies } from 'react-cookie';


function App() {
  const [cookie,setCookie] = useCookies(["Token"]);
  
  return (
    <div className="">
      <div className="">    
        <BrowserRouter>  
          {cookie.Token ? (
            <Routes>
              <Route path="/" element={<Welcome />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/*" element={<Navigate to = "/home" />}/>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Welcome />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/forgotPassword" element={<ForgotPassword />}/>
              <Route path="/*" element={<Navigate to = "/" />}/>
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

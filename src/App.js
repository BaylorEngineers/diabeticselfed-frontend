import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login.js";
import SignUp from "./components/signup";
import Forget from "./components/forget";
import Modules from "./pages/modules"
import "./App.css";

// import Course from "./components/Course";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />}></Route>\
        <Route path="/registration" element={<SignUp />}></Route>
        <Route path="/forgotpassword" element={<Forget />}></Route>
        <Route path="/modules" element={<Modules />}></Route>
        {/* <Route path="/1" element={<1 />}></Route>
        <Route path="/2" element={<2 />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

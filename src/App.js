import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login.js";
import SignUp from "./components/signup";
import Forget from "./components/forget";
import Modules from "./pages/Clinician/modules"
import AdminPage from "./pages/Admin/adminhomepage"
import AdminProfile from "./pages/Admin/adminprofile"
import AdminAccessRecords from './pages/Admin/accessrecords'
import AccountManager from './pages/Admin/accountmanager'
import ClinicianProfile from "./pages/Clinician/clinicianProfile"
import PatientList from "./pages/Clinician/patientList";
import ForumPost from "./pages/ForumPost/ForumPost";
import CreatePost from "./pages/ForumPost/CreatePost";
import PostDetail from "./pages/ForumPost/PostDetail";
import PatientPosts from "./pages/ForumPost/PatientPosts";
import Message from "./pages/Message/Message";
import ModuleList from "./pages/Modules/ModuleList.js";
import ModuleDetails from "./pages/Modules/ModuleDetails";
import { useParams } from 'react-router-dom';

import PatientProfile from "./pages/Patient/patientProfile";
import "./App.css";


const ModuleListWrapper = () => {
  const { contentAreaId } = useParams(); 
  return <ModuleList contentAreaId={contentAreaId} />;
};

const ModuleDetailsWrapper = () => {
  const { moduleId } = useParams();
  return <ModuleDetails moduleId={moduleId} />;
};


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />}></Route>\
        <Route path="/registration" element={<SignUp />}></Route>
        <Route path="/forgotpassword" element={<Forget />}></Route>
        <Route path="/modules" element={<Modules />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/adminprofile" element={<AdminProfile />}></Route>
        <Route path="/adminaccessrecords" element={<AdminAccessRecords />}></Route>
        <Route path="/accountmanager" element={<AccountManager />}></Route>
        <Route path="/clinicianprofile" element={<ClinicianProfile />}></Route>
        <Route path="/patientlist" element={<PatientList />}></Route>
        <Route path="/posts" element={<ForumPost />}></Route>
        <Route path="/create-post"  element={<CreatePost />}></Route>
        <Route path="/posts/:postId" element={<PostDetail />}></Route>
        <Route path="/myposts" element={<PatientPosts />}></Route>
        <Route path="/patientprofile" element={<PatientProfile />}></Route>
        <Route path="/message" element={<Message />}></Route>
        {/* <Route path="/content-area/:contentAreaId" element={<ModuleList />} /> */}
        <Route path="/content-area/:contentAreaId" element={<ModuleListWrapper />} />
        <Route path="/module/:moduleId" element={<ModuleDetailsWrapper />} />




        {/* <Route path="/1" element={<1 />}></Route>
        <Route path="/2" element={<2 />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
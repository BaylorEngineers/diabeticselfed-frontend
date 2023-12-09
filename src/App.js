import "./App.css";
import ProtectedRoute from './ProtectedRoute'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./components/login";
import SignUp from "./components/signup";
import Forget from "./components/forget";
import Modules from "./pages/Clinician/modules"
import Profile from "./pages/Admin/profile"
import AdminAccessRecords from './pages/Admin/accessrecords'
import AccountManager from './pages/Admin/accountmanager'
import PatientList from "./pages/Clinician/patientList";
import ForumPost from "./pages/ForumPost/ForumPost";
import CreatePost from "./pages/ForumPost/CreatePost";
import PostDetail from "./pages/ForumPost/PostDetail";
import PatientPosts from "./pages/ForumPost/PatientPosts";
import Message from "./pages/Message/Message";
import WeightTracker from "./pages/WeightTracker/weighttracker";
// import PatientList from "./pages/Clinician/patientList"
import ModuleList from "./pages/Modules/ModuleList";
import ModuleDetails from "./pages/Modules/ModuleDetails";
import PDFViewer from "./pages/Modules/PDFViewer";
import Survey from "./pages/MotivationalMessage/survey.js"
import SignupWeightAndHeight from "./pages/signUpContinued/signUpWeightAndHeight";
import SignupProgramGoal from "./pages/signUpContinued/signUpSetProgramGoal";
import ChangePassword from "./pages/Home/changepassword";
import environment from './environment';

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

        <Route path="/" element={<Home />}></Route>\
        <Route path="/login" element={<Login />}></Route>\
        <Route path="/registration" element={<SignUp />}></Route>
        <Route path="/forgotpassword" element={<Forget />}></Route>
        <Route path="/modules" element={<Modules />}></Route>
        <Route path="/module/:moduleId" element={<ModuleDetailsWrapper />} />
        <Route path="/view-pdf/:pdfId" element={<PDFViewer />} />
        <Route path="/content-area/:contentAreaId" element={<ModuleListWrapper />} />
        <Route path="/logout" element={<Home />}></Route>
        <Route path="/signUp/weight-height" element={<SignupWeightAndHeight />} />
        <Route path="/signUp/goal" element={<SignupProgramGoal />} />

        <Route path="/accountmanager" element={<ProtectedRoute component={AccountManager} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/adminaccessrecords" element={<ProtectedRoute component={AdminAccessRecords} />} />
        <Route path="/patientlist" element={<ProtectedRoute component={PatientList} />} />
        <Route path="/posts" element={<ProtectedRoute component={ForumPost} />} />
        <Route path="/create-post" element={<ProtectedRoute component={CreatePost} />} />
        <Route path="/posts/:postId" element={<ProtectedRoute component={PostDetail} />} />
        <Route path="/myposts" element={<ProtectedRoute component={PatientPosts} />} />
        <Route path="/patientprofile" element={<ProtectedRoute component={PatientProfile} />} />
        <Route path="/message" element={<ProtectedRoute component={Message} />} />
        <Route path="/weighttracker" element={<ProtectedRoute component={WeightTracker} />} />
        <Route path="/survey" element={<ProtectedRoute component={Survey} />} />
        <Route path="/changePassword" element={<ProtectedRoute component={ChangePassword} />} />
        
        {/* <Route path="/1" element={<1 />}></Route>
        <Route path="/2" element={<2 />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
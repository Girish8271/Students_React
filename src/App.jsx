import { lazy, Suspense } from "react"; // Added Suspense for lazy loading
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const StudentsDetails = lazy(() => import("./Pages/StudentsDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentsDetails" element={<StudentsDetails />} />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;

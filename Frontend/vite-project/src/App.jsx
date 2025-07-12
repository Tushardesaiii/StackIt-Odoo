import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddFeed from "./pages/AddFeed";
import Question from "./pages/Question";
import QuestionDetail from "./pages/QuestionDetail";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<AddFeed />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

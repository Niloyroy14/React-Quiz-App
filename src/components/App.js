
import { Route, Routes } from "react-router-dom";
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PubliceRoute from "./PublicRoute";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/*" element={<PubliceRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/*" element={<PrivateRoute />}>
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="result/:id" element={<Result />} />
          </Route>

        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;

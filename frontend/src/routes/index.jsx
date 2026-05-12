import { Routes, Route } from 'react-router-dom';
import StartPage from '../features/startPage/StartPage';
import RegisterPage from '../features/RegisterPage/RegisterPage';
import LoginPage from '../features/LoginPage/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
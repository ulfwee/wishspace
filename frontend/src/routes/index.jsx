import { Routes, Route } from 'react-router-dom';
import StartPage from '../features/startPage/StartPage';
import RegisterPage from '../features/RegisterPage/RegisterPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
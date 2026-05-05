import { Routes, Route } from 'react-router-dom';
import StartPage from '../features/startPage/StartPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
    </Routes>
  );
};

export default AppRoutes;
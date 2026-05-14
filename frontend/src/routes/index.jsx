import { Routes, Route } from 'react-router-dom';
import StartPage from '../features/startPage/StartPage';
import RegisterPage from '../features/RegisterPage/RegisterPage';
import LoginPage from '../features/LoginPage/LoginPage';
import HomePage from '../features/HomePage/HomePage';
import WishlistPage from '../features/WishlistPage/WishlistPage';
import FriendsPage from '../features/FriendsPage/FriendsPage';
import NotifPage from '../features/NotifPage/NotifPage';
import ProfilePage from '../features/ProfilePage/ProfilePage';
import SingleWishlistPage from '../features/SingleWishlistPage/SingleWishlistPage';
import AdminPage from '../features/AdminPage/AdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      
      <Route path="/wishlists" element={<WishlistPage />} />
      <Route path="/wishlists/:id" element={<SingleWishlistPage />} />
      
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/notifications" element={<NotifPage />} />
      <Route path="/me" element={<ProfilePage />} />
      
    </Routes>
  );
};

export default AppRoutes;
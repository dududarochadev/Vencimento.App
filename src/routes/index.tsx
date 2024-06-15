import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, ProductView } from '../pages';

export const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/product" element={<ProductView />} />

      <Route path="*" element={<Navigate to="/homepage" />}></Route>
    </Routes>
  );
};
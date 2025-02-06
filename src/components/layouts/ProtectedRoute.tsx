import { ReactNode } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';
import { useToken } from '@/Hooks/useToken';
import { logOutUser, TUser } from '@/redux/features/auth/authSlice';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useToken()

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logOutUser());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
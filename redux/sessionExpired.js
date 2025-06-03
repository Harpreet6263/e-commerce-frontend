import Cookies from 'js-cookie';
import { logoutSuccess } from './slice/authSlice';

const sessionExpired = (data, dispatch) => {
  const role = Cookies.get('role') || '';
  if (data?.error === 'TOKEN_EXPIRED') {
    dispatch(logoutSuccess('Logout successful'));
    Cookies.remove("loggedIn");
    Cookies.remove("role");
    if (typeof window !== 'undefined') {
      // window.location.href = `/${role}`;  
    }
  }
};

export default sessionExpired;

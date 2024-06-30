import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import logout from "../../reduxStore/authSlice";
 

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.Logout().then(() => {
      dispatch(logout());
      
    });
  };

  return (
    <button 
      className="inline-bock px-6 text-white hover:text-black  py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

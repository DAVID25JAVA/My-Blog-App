import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import authService from "./appwrite/Auth";
import { login, logout } from "./reduxStore/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between " style={{backgroundColor:"#081229"}}>
      <div className="w-full block">
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

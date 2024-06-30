import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status); // Check if user is logged in
 

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/Addpost",
      active: authStatus,
    },
    {
      name: "All Post",
      slug: "/AllPost",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 w-full" style={{backgroundColor:"#191d3a" ,  boxShadow: "px 1px 3px"}}>
      <Container>
        <nav className="flex">
          <div className="mr-4 text-white">
            <Link to="/">
              <Logo width="10px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block text-white hover:text-black font-serif px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

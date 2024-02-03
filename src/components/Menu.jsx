import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="."
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="courses"
      >
        Courses
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="about"
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
        to="contacts"
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Menu;

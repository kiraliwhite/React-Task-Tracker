import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default FooterComponent;

import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    <header>
      <h1>Welcome {username} to NC News!</h1>
    </header>
  );
};
export default Header;

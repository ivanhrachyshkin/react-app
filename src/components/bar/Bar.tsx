
import { Link } from "react-router-dom";

function Bar() {

  return (
      <nav>
        <ul>
          <li><Link to="/">Login Form</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/cat-facts">Cat Facts</Link></li>
        </ul>
      </nav>
  );
}

export default Bar;

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {Link} from "react-router-dom";

const App = () => {

  return (
    <div className="app-container">
      <Header />
      <div>
        Test Link <br />
        <button>
          <Link to="/users">User</Link>
        </button>
        <button>
          <Link to="/admins">Admin</Link>
        </button>
      </div>
    </div>
  );
}

export default App;

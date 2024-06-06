
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './pages';
import Navbar1 from './component/navbar';
import Admin from './pages/admin';
import Login from './pages/Login';

function App() {
  return (
    <>
  <Navbar1/>
    <Switch>
      <Route  path="/home" component={Home} /> 
      <Route path="/admin" component={Admin}/>
      <Route exact path="/" component={Login}/>
    </Switch>
    </>
  );
}

export default App;

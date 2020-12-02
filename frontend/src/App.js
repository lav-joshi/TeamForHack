import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddProfile from './components/AddProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/addProfile" exact component={AddProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

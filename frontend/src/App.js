import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

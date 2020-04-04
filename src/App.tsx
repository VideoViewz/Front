import React from 'react';
import './App.css';
import './cssFiles/styles.css'
import { Store } from './store-folder/Store';
import FormComp from './components/FormComp';
import { decorate, observable, action } from 'mobx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import *  as ROUTES from './constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';


decorate(Store, {
  urlResults: observable, //observable are like states
  updateUrlResults: action, //action functions are those that modify observables
});

//create a store class to store all the app data and the related functions
const appData = new Store();

const App: React.FC = () => {
  return (
    <div className="App container-fluid">

      <Router>
        {/* all routing pages */}
        <Switch>
          <Route exact path={ROUTES.HOME} render={(props) => <FormComp {...props} store={appData} />} />
        </Switch>
      </Router>

    </div >
  );
}

export default App;

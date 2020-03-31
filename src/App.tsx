import React from 'react';
import './App.css';
import './cssFiles/styles.css'
import { Store } from './store-folder/Store';
import Form from './components/Form';
// import { decorate, observable, action } from 'mobx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import *  as ROUTES from './constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';


// decorate(Store, {
//   notesList: observable, //observable are like states
//   deleteNote: action, //action functions are those that modify observables
//   addNote: action,
//   undoDeletedNote: action,
//   addItem: action,
//   deleteItem: action,
//   undoDeletedItem: action,
//   saveNote: action
// });

//create a store class to store all the app data and the related functions
const appData = new Store();

const App: React.FC = () => {
  return (
    <div className="App container-fluid">

      <Router>
        {/* all routing pages */}
        <Switch>
          <Route exact path={ROUTES.HOME} render={(props) => <Form {...props} store={appData} />} />
        </Switch>
      </Router>

    </div >
  );
}

export default App;

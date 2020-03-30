import React from 'react';
import './App.css';
import { Store } from './Store';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Reviews from './components/Reviews';
import { decorate, observable, action, computed } from 'mobx';
import 'bootstrap/dist/css/bootstrap.min.css';

decorate(Store, {
  reviewList: observable, //observable are states
  addReview: action, //action function modifies the state
  //every time an observable state changes, the computed function triggers automatically
  averageScore: computed,
  reviewCount: computed
});

const store = new Store();

const App: React.FC = () => {
  return (
    <div className="App container">
      <Form store={store} />
      <Dashboard store={store}/>
      <Reviews store={store}/>
    </div>
  );
}

export default App;

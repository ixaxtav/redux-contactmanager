//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';

//include bootstrap npm library into the bundle
import 'bootstrap';

//include your index.scss file into the bundle
import '../styles/index.scss';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  render() {
    return (
        <Provider store= {store}>
            <Router>
                <div className="App">
                    <Header branding="Contact Manager" />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Contacts} />
                            <Route exact path="/contact/add" component={AddContact} />
                            <Route exact path="/contact/edit/:id" component={EditContact} />
                            <Route exact path="/about" component={About} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
  }
}

export default App;




ReactDOM.render(
    <App />,
    document.querySelector('#app')
);
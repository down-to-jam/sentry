import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStudent from '../pages/ListStudent';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import SignupStudent from '../pages/SignupStudent';
import Signout from '../pages/Signout';
import CompanyHome from '../pages/CompanyHome';
import AddPosition from '../pages/AddPosition';
import EditPosition from '../pages/EditPosition';
import EditProfile from '../pages/EditProfile';
import StudentHome from '../pages/StudentHome';
import StudentDescription from '../pages/StudentDescription';
import AdminHome from '../pages/AdminHome';
import JobList from '../pages/JobList';
import Accept from '../pages/Accept';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signupstudent" component={SignupStudent}/>
              <ProtectedRoute path="/studenthome" component={StudentHome}/>
              <ProtectedRoute path="/companyhome" component={CompanyHome}/>
              <ProtectedRoute path="/studentadd" component={StudentDescription}/>
              <ProtectedRoute path="/liststudent" component={ListStudent}/>
              <ProtectedRoute path="/companyadd" component={AddPosition}/>
              <ProtectedRoute path="/joblist" component={JobList}/>
              <ProtectedRoute path="/accept" component={Accept}/>
              <ProtectedRoute path="/editposition/:_id" component={EditPosition}/>
              <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
              <AdminProtectedRoute path="/adminhome" component={AdminHome}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
// import Login from './Login.js';
import { HashRouter, Redirect, Route, Switch} from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('main'));

// ReactDOM.render(
//   <HashRouter>
//     <Switch>
//       <Route
//         exact
//         path="/"
//         render={() => {
//             return (
//               <Redirect to="/search" />
//             )
//         }}
//       />
//       <Route path="/search" component={App}/>
//     </Switch>
//   </HashRouter>
//   , document.getElementById('main'));


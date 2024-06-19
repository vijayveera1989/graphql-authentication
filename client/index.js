import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient ,{createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from "react-router";
import App from"./components/App";
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Dashboard from "./components/Dashboard";
import requiredAuth from './components/requiredAuth';


/*
By default client will not send cookies to the graphql server
so we need to inform that pass the cookie in the request
*/
const networkInterface =  createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin"
  }
})
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
         <Route path="login" component={Login}/>
         <Route path="signup" component={SignUp}/>
         <Route path="dashboard" component={requiredAuth(Dashboard)}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));

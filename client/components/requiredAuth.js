import React, { Component } from "react";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/currentUserQuery";
import { hashHistory } from "react-router";

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
        console.log("this.props.data.loading",nextProps.data.loading)
        console.log("this.props.data.user",nextProps.data.user)
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return graphql(currentUserQuery)(RequireAuth);
};

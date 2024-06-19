import React, { Component } from "react";
import AuthForm from "./AuthForm";
import loginMutation from "../mutations/loginMutation";
import { graphql } from "react-apollo";
import query from "../queries/currentUserQuery";
import { hashHistory } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={errors :[]};
  }

  componentWillUpdate(nextProps){
    if(!this.props.data.user&& nextProps.data.user){
      hashHistory.push("/dashboard");
    }
  }
  submitCb({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        console.log(errors);
        this.setState({ errors });
      });
  };
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.submitCb.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(loginMutation)(Login));

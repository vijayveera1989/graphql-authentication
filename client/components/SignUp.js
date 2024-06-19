import { graphql } from "react-apollo";
import React, { Component } from "react";
import AuthForm from "./AuthForm";
import signupMutation from "../mutations/signupMutation";
import query from "../queries/currentUserQuery";
import { hashHistory } from "react-router";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { error: [] };
  }

  componentWillUpdate(nextProps){
    if(!this.props.data.user&& nextProps.data.user){
      hashHistory.push("/dashboard");
    }
  }


  signUpCb({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.signUpCb.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(signupMutation)(SignUp));

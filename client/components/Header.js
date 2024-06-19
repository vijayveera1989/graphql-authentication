import React from "react";
import { graphql } from "react-apollo";
import query from "../queries/currentUserQuery";
import { Link } from "react-router";
import mutation from "../mutations/logoutMutations";

const Header = (props) => {
  console.log(props.data);

  const logout = () => {
    // after logout is called we need to call the user query to update the status
    props.mutate({
        refetchQueries:[{query:query}]
    });
  }

  const renderButtons = () => {
    const {loading,user} = props.data;
    if (loading) return <div></div>;
    if (user) {
      return <li><a onClick={()=>logout()}>LogOut</a></li>;
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        </div>
      );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">Home</Link>
        <ul className="right">
        {renderButtons()}
        </ul>
        </div>
    </nav>
  );
};

export default graphql(mutation)(
    graphql(query)(Header)
);

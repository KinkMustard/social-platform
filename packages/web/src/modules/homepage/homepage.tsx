import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const meQuery = gql`
  {
    me {
      id
      email
    }
  }
`;

export class Homepage extends React.PureComponent {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data.me) {
            return (
              <React.Fragment>
                <p>{`hello ${JSON.stringify(data.me["email"])}`}</p>
                <Link to="/logout">Logouftf</Link>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                <p>not signed in!</p>
                <Link to="/login">Login</Link>
              </React.Fragment>
            );
          }
        }}
      </Query>
    );
  }
}

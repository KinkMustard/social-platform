import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
            return <p>{`hello ${JSON.stringify(data.me["email"])}`}</p>;
          } else {
            return <p>not signed in!</p>;
          }
        }}
      </Query>
    );
  }
}

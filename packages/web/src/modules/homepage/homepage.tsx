import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { RouteComponentProps, Redirect } from "react-router-dom";

const meQuery = gql`
  {
    me {
      id
      email
      username
    }
  }
`;

export class Homepage extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data && data.me) {
            return <Redirect to="/listings" />;
          } else {
            return (
              <div style={{ background: "#fff", padding: 24, minHeight: 2080 }}>
                this is content
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "antd";

const meQuery = gql`
  {
    me {
      id
      email
      username
    }
  }
`;

export class MainHeader extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data && data.me) {
            return (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  flexDirection: "row-reverse"
                }}
              >
                <Button
                  style={{
                    marginTop: "18px"
                  }}
                  type="danger"
                  onClick={() => {
                    this.props.history.push("/logout");
                  }}
                >
                  Log out
                </Button>
              </div>
            );
          } else {
            return (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  flexDirection: "row-reverse"
                }}
              >
                <Button
                  style={{
                    marginTop: "18px",
                    marginLeft: "20px"
                  }}
                  type="primary"
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  style={{
                    marginTop: "18px"
                  }}
                  type="danger"
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

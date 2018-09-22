import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Layout, Button } from "antd";

const meQuery = gql`
  {
    me {
      id
      email
    }
  }
`;

const { Header, Content, Footer } = Layout;
export class Homepage extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data && data.me) {
            return <Redirect to="/listings" />;
          } else {
            return (
              <Layout>
                <Header>
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
                </Header>
                <Content style={{ padding: "0 50px" }}>
                  <div
                    style={{ background: "#fff", padding: 24, minHeight: 280 }}
                  >
                    this is content
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  this is a footer
                </Footer>
              </Layout>
            );
          }
        }}
      </Query>
    );
  }
}

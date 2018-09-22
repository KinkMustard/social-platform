import * as React from "react";
import { Card, Icon, Button } from "antd";
import {
  withFindListings,
  WithFindListings,
  UpvoteListing
} from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";

const meQuery = gql`
  {
    me {
      email
      id
      upvoted
    }
  }
`;

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithFindListings
  > {
  render() {
    const { listings, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <div>...loading</div>}
        <Query query={meQuery}>
          {({ data }) => {
            console.log("this is the data 000", data);
            return <p>nice</p>;
          }}
        </Query>
        {listings.map(l => (
          <div
            style={{
              display: "flex",
              margin: "auto"
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#fafafa",
                textAlign: "center"
              }}
            >
              <UpvoteListing>
                {({ upvoteListing }) => (
                  <Query query={meQuery}>
                    {({ data }) => {
                      console.log("this is the data", data);
                      console.log("big test", JSON.stringify(data));
                      return (
                        <Button
                          type="primary"
                          shape="circle"
                          // disabled={data.upvoted.includes(l.id)}
                          icon="up"
                          size="large"
                          style={{
                            margin: "auto",
                            display: "block",
                            marginTop: 20
                          }}
                          onClick={async () => {
                            let temp = l.upvotes;
                            temp++;
                            const result = await upvoteListing({
                              variables: {
                                listingId: l.id,
                                upvotes: temp,
                                userId: data.id,
                                upvoted: data.upvoted
                              }
                            });
                            console.log(result);
                          }}
                        />
                      );
                    }}
                  </Query>
                )}
              </UpvoteListing>
              <p
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                {l.upvotes - l.downvotes}
              </p>
              <Button
                type="danger"
                shape="circle"
                icon="down"
                size="large"
                style={{
                  margin: "auto",
                  display: "block"
                }}
              />
            </div>
            <Card
              key={`${l.id}-card`}
              hoverable={true}
              style={{ width: 640, marginBottom: 10 }}
              onClick={() => {
                this.props.history.push(`/listing/${l.id}`);
              }}
              actions={[
                <Icon type="setting" key="1" />,
                <Icon type="edit" key="2" />,
                <Icon type="ellipsis" key="3" />
              ]}
            >
              <p style={{ fontSize: 14, marginBottom: 0 }}>
                posted by: {l.owner.email}
              </p>
              <p style={{ fontSize: 28 }}>{l.name}</p>

              {l.pictureUrl && (
                <img
                  alt="example"
                  src={l.pictureUrl}
                  style={{
                    display: "block",
                    maxWidth: 590,
                    maxHeight: 480,
                    width: "auto",
                    height: "auto",
                    margin: "auto"
                  }}
                />
              )}
              <p style={{ fontSize: 18, display: "inline" }}>{l.description}</p>
            </Card>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

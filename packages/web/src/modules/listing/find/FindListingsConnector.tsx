import * as React from "react";
import { Card, Icon, Button, Modal } from "antd";
import {
  withFindListings,
  WithFindListings,
  UpvoteListing
} from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
// import { Link } from "react-router-dom";

const meQuery = gql`
  {
    me {
      email
      id
      upvoted
      downvoted
    }
  }
`;

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithFindListings
  > {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
    this.setState({
      visible: false
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
    this.setState({
      visible: false
    });
  };
  render() {
    const { listings, loading, refetchListings } = this.props;
    return (
      <React.Fragment>
        {loading && <div>...loading</div>}
        {listings.map(l => (
          <div
            style={{
              display: "flex",
              margin: "auto",
              marginLeft: "20vw",
              marginRight: "20vw"
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#fafafa",
                textAlign: "center",
                height: 695
              }}
            >
              <UpvoteListing>
                {({ upvoteListing }) => (
                  <Query query={meQuery}>
                    {({ data, refetch }) => {
                      if (!data.me) {
                        return <div>...loading</div>;
                      }
                      console.log("data", data);
                      console.log("l", l);
                      return (
                        <React.Fragment>
                          <Button
                            shape="circle"
                            icon="up"
                            size="large"
                            style={
                              data.me.upvoted.includes(l.id)
                                ? {
                                  margin: "auto",
                                  display: "block",
                                  marginTop: 20,
                                  backgroundColor: "#69c0ff"
                                }
                                : {
                                  margin: "auto",
                                  display: "block",
                                  marginTop: 20,
                                  backgroundColor: "#e6f7ff"
                                }
                            }
                            onClick={async () => {
                              if (
                                !data.me.upvoted.includes(l.id) &&
                                data.me.downvoted.includes(l.id)
                              ) {
                                let tempUpvotes = l.upvotes;
                                tempUpvotes++;
                                let tempDownvotes = l.downvotes;
                                tempDownvotes--;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: tempUpvotes,
                                    downvotes: tempDownvotes,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "upvote-while-downvoted"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              } else if (!data.me.upvoted.includes(l.id)) {
                                let temp = l.upvotes;
                                temp++;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: temp,
                                    downvotes: l.downvotes,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "upvote"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              } else if (data.me.upvoted.includes(l.id)) {
                                let temp = l.upvotes;
                                temp--;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: temp,
                                    downvotes: l.downvotes,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "deupvote"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              }
                            }}
                          />
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
                            shape="circle"
                            icon="down"
                            size="large"
                            style={
                              data.me.downvoted.includes(l.id)
                                ? {
                                  margin: "auto",
                                  display: "block",
                                  backgroundColor: "#ffc069"
                                }
                                : {
                                  margin: "auto",
                                  display: "block",
                                  backgroundColor: "#fff7e6"
                                }
                            }
                            onClick={async () => {
                              if (
                                !data.me.downvoted.includes(l.id) &&
                                data.me.upvoted.includes(l.id)
                              ) {
                                let tempDownvotes = l.downvotes;
                                tempDownvotes++;
                                let tempUpvotes = l.upvotes;
                                tempUpvotes--;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: tempUpvotes,
                                    downvotes: tempDownvotes,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "downvote-while-upvoted"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              } else if (!data.me.downvoted.includes(l.id)) {
                                let temp = l.downvotes;
                                temp++;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: l.upvotes,
                                    downvotes: temp,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "downvote"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              } else if (data.me.downvoted.includes(l.id)) {
                                let temp = l.downvotes;
                                temp--;
                                const result = await upvoteListing({
                                  variables: {
                                    listingId: l.id,
                                    upvotes: l.upvotes,
                                    downvotes: temp,
                                    userId: data.me.id,
                                    upvoted: data.me.upvoted,
                                    downvoted: data.me.downvoted,
                                    voteScenario: "dedownvote"
                                  }
                                });
                                console.log("result", result);
                                refetch();
                                refetchListings();
                              }
                            }}
                          />
                        </React.Fragment>
                      );
                    }}
                  </Query>
                )}
              </UpvoteListing>
            </div>
            <Card
              key={`${l.id}-card`}
              hoverable={true}
              style={{ width: 640, height: 695, marginBottom: 10 }}
              onClick={() => {
                // this.props.history.push(`/listing/${l.id}`);
                this.props.history.push(`/listings/${l.id}/comments`);
                this.showModal();
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
              <p style={{ fontSize: 18, display: "inline" }}>
                {l.description}
                posted {distanceInWordsToNow(Number(l.datePosted))} ago
              </p>
            </Card>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
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
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

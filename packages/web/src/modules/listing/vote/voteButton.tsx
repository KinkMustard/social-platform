import * as React from "react";
import { Button } from "antd";
import gql from "graphql-tag";
import { UpvoteListing } from "@abb/controller";
import { Query } from "react-apollo";

interface Props {
  listingId: string;
  listingUpvotes: number;
  listingDownvotes: number;
  refetchListings: any;
}

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

export class VoteButton extends React.PureComponent<Props> {
  render() {
    const {
      listingId,
      listingUpvotes,
      listingDownvotes,
      refetchListings
    } = this.props;
    return (
      <UpvoteListing>
        {({ upvoteListing }) => (
          <Query query={meQuery}>
            {({ data, refetch }) => {
              if (!data.me) {
                return <div>...loading</div>;
              }
              console.log("data", data);
              return (
                <React.Fragment>
                  <Button
                    shape="circle"
                    icon="up"
                    size="large"
                    style={
                      data.me.upvoted.includes(listingId)
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
                        !data.me.upvoted.includes(listingId) &&
                        data.me.downvoted.includes(listingId)
                      ) {
                        let tempUpvotes = listingUpvotes;
                        tempUpvotes++;
                        let tempDownvotes = listingDownvotes;
                        tempDownvotes--;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
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
                      } else if (!data.me.upvoted.includes(listingId)) {
                        let temp = listingUpvotes;
                        temp++;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
                            upvotes: temp,
                            downvotes: listingDownvotes,
                            userId: data.me.id,
                            upvoted: data.me.upvoted,
                            downvoted: data.me.downvoted,
                            voteScenario: "upvote"
                          }
                        });
                        console.log("result", result);
                        refetch();
                        refetchListings();
                      } else if (data.me.upvoted.includes(listingId)) {
                        let temp = listingUpvotes;
                        temp--;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
                            upvotes: temp,
                            downvotes: listingDownvotes,
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
                    {listingUpvotes - listingDownvotes}
                  </p>
                  <Button
                    shape="circle"
                    icon="down"
                    size="large"
                    style={
                      data.me.downvoted.includes(listingId)
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
                        !data.me.downvoted.includes(listingId) &&
                        data.me.upvoted.includes(listingId)
                      ) {
                        let tempDownvotes = listingDownvotes;
                        tempDownvotes++;
                        let tempUpvotes = listingUpvotes;
                        tempUpvotes--;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
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
                      } else if (!data.me.downvoted.includes(listingId)) {
                        let temp = listingDownvotes;
                        temp++;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
                            upvotes: listingUpvotes,
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
                      } else if (data.me.downvoted.includes(listingId)) {
                        let temp = listingDownvotes;
                        temp--;
                        const result = await upvoteListing({
                          variables: {
                            listingId,
                            upvotes: listingUpvotes,
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
    );
  }
}

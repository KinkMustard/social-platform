import * as React from "react";
import { Button } from "antd";
import gql from "graphql-tag";
import { UpvoteListing } from "@abb/controller";
import { Query } from "react-apollo";
import { ButtonSize } from "antd/lib/button/button";

interface Props {
  listingId: string;
  listingUpvotes: number;
  listingDownvotes: number;
  refetchListings: any;
  voteTarget: string;
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
      refetchListings,
      voteTarget
    } = this.props;
    return (
      <UpvoteListing>
        {({ upvoteListing }) => (
          <Query query={meQuery}>
            {({ data, refetch }) => {
              if (!data.me) {
                return <div>...loading</div>;
              }
              let styleProperties: {
              buttonSize: ButtonSize;
              buttonMargin: number;
              textMargin: number;
              fontSize: number;
              } = {
                buttonSize: "large",
                buttonMargin: 20,
                textMargin: 7,
                fontSize: 18
              };
              if (voteTarget === "comment") {
                styleProperties = {
                  buttonSize: "small",
                  buttonMargin: 10,
                  textMargin: 2,
                  fontSize: 10
                };
              }
              return (
                <React.Fragment>
                  <Button
                    shape="circle"
                    icon="up"
                    size={styleProperties.buttonSize}
                    style={
                      data.me.upvoted.includes(listingId)
                        ? {
                          margin: "auto",
                          display: "block",
                          marginTop: styleProperties.buttonMargin,
                          backgroundColor: "#69c0ff"
                        }
                        : {
                          margin: "auto",
                          display: "block",
                          marginTop: styleProperties.buttonMargin,
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
                            voteScenario: "upvote-while-downvoted",
                            voteTarget
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
                            voteScenario: "upvote",
                            voteTarget
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
                            voteScenario: "deupvote",
                            voteTarget
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
                      fontSize: styleProperties.fontSize,
                      marginTop: styleProperties.textMargin,
                      marginBottom: styleProperties.textMargin
                    }}
                  >
                    {listingUpvotes - listingDownvotes}
                  </p>
                  <Button
                    shape="circle"
                    icon="down"
                    size={styleProperties.buttonSize}
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
                            voteScenario: "downvote-while-upvoted",
                            voteTarget
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
                            voteScenario: "downvote",
                            voteTarget
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
                            voteScenario: "dedownvote",
                            voteTarget
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

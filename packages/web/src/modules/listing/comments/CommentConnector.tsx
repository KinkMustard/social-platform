import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewComments } from "@abb/controller";
import { InputBar } from "./CommentInputBar";
import { VoteButton } from "../vote/VoteButton";
import { isEmpty } from "lodash";

export class CommentConnector extends React.PureComponent<
  RouteComponentProps<{
  listingId: string;
  }>
  > {
  unsubscribe: () => void;

  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewComments listingId={listingId}>
        {({ loading, comments, refetchComments }) => {
          if (loading) {
            return <div>...loading</div>;
          }
          if (!comments || isEmpty(comments)) {
            return (
              <React.Fragment>
                <InputBar
                  listingId={listingId}
                  refetchComments={refetchComments}
                />
                <div
                  style={{
                    marginTop: "16px",
                    border: "1px dashed #e9e9e9",
                    borderRadius: "6px",
                    backgroundColor: "#fafafa",
                    minHeight: "200px",
                    textAlign: "center",
                    paddingTop: "80px",
                    fontSize: 20
                  }}
                >
                  no comments yet
                </div>
              </React.Fragment>
            );
          }

          return (
            <div>
              <InputBar
                listingId={listingId}
                refetchComments={refetchComments}
              />
              {comments.map((m, i) => (
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        display: "inline",
                        float: "left"
                      }}
                    >
                      <VoteButton
                        listingId={m.id}
                        listingUpvotes={m.upvotes}
                        listingDownvotes={m.downvotes}
                        refetchListings={refetchComments}
                        voteTarget="comment"
                      />
                    </div>
                    <div
                      key={`${i}-lm`}
                      style={{
                        marginLeft: 6,
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <p style={{ marginBottom: 0, fontSize: 12 }}>
                        {m.user.email}
                      </p>
                      <p style={{ marginTop: 0, fontSize: 14 }}>{m.text}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          );
        }}
      </ViewComments>
    );
  }
}

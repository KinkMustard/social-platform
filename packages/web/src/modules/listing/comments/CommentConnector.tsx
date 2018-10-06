import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewComments } from "@abb/controller";
import { InputBar } from "./CommentInputBar";
import { VoteButton } from "../vote/VoteButton";

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
          if (!comments) {
            return (
              <React.Fragment>
                <InputBar
                  listingId={listingId}
                  refetchComments={refetchComments}
                />
                <div>no comments yet</div>
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
                      display: "block",
                      height: 200
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
                    <div key={`${i}-lm`}>{m.text}</div>
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

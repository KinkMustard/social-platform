import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewComments } from "@abb/controller";
import { InputBar } from "./CommentInputBar";

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
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
            </div>
          );
        }}
      </ViewComments>
    );
  }
}

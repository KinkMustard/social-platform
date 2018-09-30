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
        {({ loading, comments }) => {
          if (loading) {
            return <div>...loading</div>;
          }
          if (!comments) {
            return <div>no comments yet</div>;
          }

          return (
            <div>
              {comments.map((m, i) => (
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
              <InputBar listingId={listingId} />
            </div>
          );
        }}
      </ViewComments>
    );
  }
}

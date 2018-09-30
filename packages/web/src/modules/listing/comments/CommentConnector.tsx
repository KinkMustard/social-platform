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

                <div
                  style={{
                    marginTop: "16px",
                    border: "1px dashed #e8e8e8",
                    borderRadius: "6px",
                    backgroundColor: "#f5f5f5",
                    minHeight: "200px",
                    textAlign: "center",
                    paddingTop: "80px"
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
              <div
                style={{
                  marginTop: "16px",
                  border: "1px dashed #e9e9e9",
                  borderRadius: "6px",
                  backgroundColor: "#fafafa",
                  minHeight: "200px",
                  textAlign: "center",
                  paddingTop: "80px"
                }}
              >
                {comments.map((m, i) => (
                  <div key={`${i}-lm`}>{m.text}</div>
                ))}
              </div>
            </div>
          );
        }}
      </ViewComments>
    );
  }
}

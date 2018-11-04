import * as React from "react";
import { Card, Icon } from "antd";
import {
  withFindListings,
  WithFindListings,
  ViewComments
} from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
// import { Link } from "react-router-dom";
import { VoteButton } from "../vote/VoteButton";

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithFindListings
  > {
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
              width: 740,
              maxHeight: 800,
              minHeight: 400,
              marginBottom: 30
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#fafafa",
                textAlign: "center"
              }}
            >
              <VoteButton
                listingId={l.id}
                listingUpvotes={l.upvotes}
                listingDownvotes={l.downvotes}
                refetchListings={refetchListings}
                voteTarget="listing"
              />
            </div>
            <Card
              key={`${l.id}-card`}
              hoverable={true}
              style={{ width: 640 }}
              onClick={() => {
                // this.props.history.push(`/listing/${l.id}`);
                this.props.history.push(`/listings/${l.id}/modal`);
                // this.showModal();
              }}
            >
              <p style={{ fontSize: 14, marginBottom: 0 }}>
                posted by: {l.owner.username}
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
              <div
                style={{
                  fontSize: 18,
                  marginTop: 8,
                  overflowWrap: "break-word",
                  border: "1px solid #e9e9e9",
                  borderRadius: "6px",
                  backgroundColor: "#fafafa",
                  textAlign: "center",
                  padding: 8
                }}
              >
                {l.description}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 12,
                  padding: 8,
                  borderTop: "solid",
                  marginBottom: -20,
                  fontSize: 18,
                  color: "#bfbfbf"
                }}
              >
                <Icon type="message" style={{ marginRight: 6 }} />
                <ViewComments listingId={l.id}>
                  {({ loading: commentLoading, comments }) => {
                    if (commentLoading || !comments) {
                      return <div>...loading</div>;
                    }
                    return <div>comments: {comments.length}</div>;
                  }}
                </ViewComments>
                <Icon
                  type="clock-circle"
                  style={{ marginRight: 6, marginLeft: 14 }}
                />
                posted {distanceInWordsToNow(Number(l.datePosted))} ago
              </div>
            </Card>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

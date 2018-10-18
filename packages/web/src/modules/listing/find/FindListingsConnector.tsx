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
              style={{ width: 640, height: 695, marginBottom: 10 }}
              onClick={() => {
                // this.props.history.push(`/listing/${l.id}`);
                this.props.history.push(`/listings/${l.id}/modal`);
                // this.showModal();
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
                <ViewComments listingId={l.id}>
                  {({ loading: commentLoading, comments }) => {
                    if (commentLoading || !comments) {
                      return <div>...loading</div>;
                    }
                    return <div>comments: {comments.length}</div>;
                  }}
                </ViewComments>
              </p>
            </Card>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

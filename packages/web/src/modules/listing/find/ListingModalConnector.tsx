import * as React from "react";
import { ViewListing } from "@abb/controller";
import { RouteComponentProps, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { CommentConnector } from "../comments/CommentConnector";
import { VoteButton } from "../vote/VoteButton";

export class ListingModalConnector extends React.PureComponent<
  RouteComponentProps<{
  listingId: string;
  }>
  > {
  handleOk = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
  };
  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewListing listingId={listingId}>
        {data => {
          console.log(data);
          if (!data.listing) {
            return <div>...loading</div>;
          }

          return (
            <React.Fragment>
              <Modal
                title={data.listing.name}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ minWidth: "60vw" }}
                footer={<Button onClick={this.handleOk}>Close</Button>}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "inline",
                    float: "left"
                  }}
                >
                  <VoteButton
                    listingId={data.listing.id}
                    listingUpvotes={data.listing.upvotes}
                    listingDownvotes={data.listing.downvotes}
                    refetchListings={data.refetchListings}
                    voteTarget="listing"
                  />
                </div>
                {data.listing.pictureUrl && (
                  <img
                    alt="example"
                    src={data.listing.pictureUrl}
                    style={{
                      display: "block",
                      maxWidth: 790,
                      maxHeight: 580,
                      minWidth: 200,
                      minHeight: 300,
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
                    padding: 8,
                    marginBottom: 12
                  }}
                >
                  <div>{data.listing.description}</div>
                  <div>
                    <Link to={`/listing/${listingId}/chat`}>chat</Link>
                  </div>
                  <div>
                    <Link to={`/listing/${listingId}/edit`}>edit</Link>
                  </div>
                </div>

                <CommentConnector {...this.props} />
              </Modal>
            </React.Fragment>
          );
        }}
      </ViewListing>
    );
  }
}

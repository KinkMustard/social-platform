import * as React from "react";
import { ViewListing } from "@abb/controller";
import { RouteComponentProps, Link } from "react-router-dom";
import { Modal } from "antd";
import { CommentConnector } from "../comments/CommentConnector";

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
            <Modal
              title={data.listing.name}
              visible={true}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{ minWidth: "60vw" }}
            >
              {data.listing.pictureUrl && (
                <img
                  alt="example"
                  src={data.listing.pictureUrl}
                  style={{
                    display: "block",
                    maxWidth: 790,
                    maxHeight: 580,
                    width: "auto",
                    height: "auto",
                    margin: "auto"
                  }}
                />
              )}
              <div>upvotes: {data.listing.upvotes}</div>
              <div>downvotes: {data.listing.downvotes}</div>
              <div>description: {data.listing.description}</div>
              <div>
                <Link to={`/listing/${listingId}/chat`}>chat</Link>
              </div>
              <div>
                <Link to={`/listing/${listingId}/edit`}>edit</Link>
              </div>
              <CommentConnector {...this.props} />
            </Modal>
          );
        }}
      </ViewListing>
    );
  }
}

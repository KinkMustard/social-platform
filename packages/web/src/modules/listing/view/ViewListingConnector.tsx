import * as React from "react";
import { ViewListing } from "@abb/controller";
import { RouteComponentProps, Link } from "react-router-dom";

export class ViewListingConnector extends React.PureComponent<
  RouteComponentProps<{
  listingId: string;
  }>
  > {
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
            <div>
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
                <div>name: {data.listing.name}</div>
                <div>upvotes: {data.listing.upvotes}</div>
                <div>downvotes: {data.listing.downvotes}</div>
                <div>description: {data.listing.description}</div>
                <div>
                  <Link to={`/listing/${listingId}/chat`}>chat</Link>
                </div>
                <div>
                  <Link to={`/listing/${listingId}/edit`}>edit</Link>
                </div>
              </div>
            </div>
          );
        }}
      </ViewListing>
    );
  }
}

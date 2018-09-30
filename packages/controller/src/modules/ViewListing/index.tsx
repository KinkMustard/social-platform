// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  ViewListingQuery_viewListing,
  ViewListingQuery,
  ViewListingQueryVariables
} from "../../schemaTypes";

export const viewListingQuery = gql`
  query ViewListingQuery($id: String!) {
    viewListing(id: $id) {
      id
      name
      description
      upvotes
      downvotes
      pictureUrl
      owner {
        id
        email
      }
    }
  }
`;

export interface WithViewListing {
  listing: ViewListingQuery_viewListing | null;
  loading: boolean;
  refetchListings: any;
}

interface Props {
  listingId: string;
  children: (data: WithViewListing) => JSX.Element | null;
}

export class ViewListing extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<ViewListingQuery, ViewListingQueryVariables>
        query={viewListingQuery}
        variables={{ id: listingId }}
      >
        {({ data, loading, refetch }) => {
          let listing: ViewListingQuery_viewListing | null = null;
          let refetchListings: any;

          if (data && data.viewListing) {
            listing = data.viewListing;
            refetchListings = refetch;
          }

          return children({
            listing,
            loading,
            refetchListings
          });
        }}
      </Query>
    );
  }
}

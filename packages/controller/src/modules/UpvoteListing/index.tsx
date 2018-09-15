// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  UpvoteListingMutation,
  UpvoteListingMutationVariables
} from "../../schemaTypes";

export const upvoteListingMutation = gql`
  mutation UpvoteListingMutation($listingId: String!, $upvotes: Int!) {
    upvoteListing(listingId: $listingId, upvotes: $upvotes)
  }
`;

export interface WithUpvoteListing {
  upvoteListing: MutationFn<
    UpvoteListingMutation,
    UpvoteListingMutationVariables
  >;
}

interface Props {
  children: (data: WithUpvoteListing) => JSX.Element | null;
}

export class UpvoteListing extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<UpvoteListingMutation, UpvoteListingMutationVariables>
        mutation={upvoteListingMutation}
      >
        {mutate => {
          return children({
            upvoteListing: mutate
          });
        }}
      </Mutation>
    );
  }
}

// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  UpvoteListingMutation,
  UpvoteListingMutationVariables
} from "../../schemaTypes";

export const upvoteListingMutation = gql`
  mutation UpvoteListingMutation(
    $listingId: String!
    $upvotes: Int!
    $userId: String!
    $upvoted: [String!]
    $voteScenario: String!
  ) {
    upvoteListing(
      listingId: $listingId
      upvotes: $upvotes
      userId: $userId
      upvoted: $upvoted
      voteScenario: $voteScenario
    )
  }
`;

export interface WithUpvoteListing {
  upvoteListing: MutationFn<
    UpvoteListingMutation,
    UpvoteListingMutationVariables
  >;
}

interface Props {
  children: (data: WithUpvoteListing) => any;
}

export class UpvoteListing extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<UpvoteListingMutation, UpvoteListingMutationVariables>
        mutation={upvoteListingMutation}
      >
        {mutate => {
          console.log("got this far 2");
          return children({
            upvoteListing: mutate
          });
        }}
      </Mutation>
    );
  }
}

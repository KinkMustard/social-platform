// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  ViewCommentsQuery_comments,
  ViewCommentsQuery,
  ViewCommentsQueryVariables
} from "../../schemaTypes";

export const viewCommentsQuery = gql`
  query ViewCommentsQuery($listingId: String!) {
    comments(listingId: $listingId) {
      id
      text
      datePosted
      listingId
      upvotes
      downvotes
      user {
        id
        email
        username
      }
    }
  }
`;

export interface WithViewComments {
  comments: ViewCommentsQuery_comments[] | null;
  loading: boolean;
  refetchComments: any;
}

interface Props {
  listingId: string;
  children: (data: WithViewComments) => JSX.Element | null;
}

export class ViewComments extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<ViewCommentsQuery, ViewCommentsQueryVariables>
        query={viewCommentsQuery}
        variables={{ listingId }}
      >
        {({ data, loading, refetch }) => {
          let comments: ViewCommentsQuery_comments[] | null = null;
          let refetchComments: any;

          if (data && data.comments) {
            comments = data.comments;
            refetchComments = refetch;
          }

          return children({
            comments,
            loading,
            refetchComments
          });
        }}
      </Query>
    );
  }
}

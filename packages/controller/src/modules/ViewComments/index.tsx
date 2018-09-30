// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  ViewCommentsQuery_Comments,
  ViewCommentsQuery,
  ViewCommentQueryVariables
} from "../../schemaTypes";

export const viewCommentsQuery = gql`
  query ViewCommentsQuery($id: String!) {
    viewComments(id: $id) {
      id
      text
      datePosted
      listingId
      upvotes
      downvotes
      user {
        id
        email
      }
    }
  }
`;

export interface WithViewComments {
  comments: ViewCommentsQuery_Comments[] | null;
  loading: boolean;
}

interface Props {
  listingId: string;
  children: (data: WithViewComments) => JSX.Element | null;
}

export class ViewComments extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<ViewCommentsQuery, ViewCommentQueryVariables>
        query={viewCommentsQuery}
        variables={{ listingId }}
      >
        {({ data, loading }) => {
          let comments: ViewCommentsQuery_Comments[] | null = null;

          if (data && data.comments) {
            comments = data.comments;
          }

          return children({
            comments,
            loading
          });
        }}
      </Query>
    );
  }
}

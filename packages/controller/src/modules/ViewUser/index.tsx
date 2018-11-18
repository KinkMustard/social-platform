// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  ViewUserQuery_viewUser,
  ViewUserQueryVariables,
  ViewUserQuery
} from "../../schemaTypes";

export const viewUserQuery = gql`
  query ViewUserQuery($username: String!) {
    viewUser(username: $username) {
      id
      email
      username
      upvoted
      downvoted
    }
  }
`;

export interface WithViewUser {
  user: ViewUserQuery_viewUser | null;
  loading: boolean;
  refetchUser: any;
}

interface Props {
  username: string;
  children: (data: WithViewUser) => JSX.Element | null;
}

export class ViewUser extends React.PureComponent<Props> {
  render() {
    const { children, username } = this.props;
    return (
      <Query<ViewUserQuery, ViewUserQueryVariables>
        query={viewUserQuery}
        variables={{ username }}
      >
        {({ data, loading, refetch }) => {
          let user: ViewUserQuery_viewUser | null = null;
          let refetchUser: any;

          if (data && data.viewUser) {
            user = data.viewUser;
            refetchUser = refetch;
          }

          return children({
            user,
            loading,
            refetchUser
          });
        }}
      </Query>
    );
  }
}

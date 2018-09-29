// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables
} from "../../schemaTypes";

export const createCommentMutation = gql`
  mutation CreateCommentMutation($comment: CommentInput!) {
    createComment(comment: $comment)
  }
`;

export interface WithCreateComment {
  createComment: MutationFn<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >;
}

interface Props {
  children: (data: WithCreateComment) => JSX.Element | null;
}

export class CreateComment extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<CreateCommentMutation, CreateCommentMutationVariables>
        mutation={createCommentMutation}
      >
        {mutate => {
          return children({
            createComment: mutate
          });
        }}
      </Mutation>
    );
  }
}

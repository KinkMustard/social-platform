import * as React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps } from "react-router-dom"
import { Avatar } from "antd"

const meQuery = gql`
  {
    me {
      id
      email
      username
    }
  }
`

export class MainHeader extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data && data.me) {
            return <Avatar size={64} icon="user" />
          } else {
            return <Avatar size={64} icon="user" />
          }
        }}
      </Query>
    )
  }
}

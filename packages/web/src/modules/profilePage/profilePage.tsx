import * as React from "react"
import { ViewUser } from "@abb/controller"
import { RouteComponentProps } from "react-router-dom"
import { Avatar } from "antd"
export class ProfilePage extends React.PureComponent<
  RouteComponentProps<{ username: string }>
> {
  render() {
    const {
      match: {
        params: { username }
      }
    } = this.props
    return (
      <ViewUser username={username}>
        {data => {
          if (!data.user) {
            return <div>user not found</div>
          } else {
            return (
              <div style={{ background: "#fff", padding: 24, minHeight: 2080 }}>
                <Avatar
                  size={64}
                  icon="user"
                />
                hello {data.user.username}
              </div>
            )
          }
        }}
      </ViewUser>
    )
  }
}

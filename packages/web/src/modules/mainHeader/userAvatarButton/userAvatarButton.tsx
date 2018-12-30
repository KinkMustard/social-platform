import * as React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps } from "react-router-dom"
import { Popover, Button } from "antd"

const meQuery = gql`
  {
    me {
      id
      email
      username
    }
  }
`

export class UserAvatarButton extends React.Component<RouteComponentProps<{}>> {
  state = {
    visible: false
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible })
  }

  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          if (data && data.me) {
            return (
              <Popover
                content={
                  <Button
                    type="primary"
                    onClick={() => {
                      this.hide()
                      this.props.history.push(`/profile/${data.me.username}`)
                    }}
                    icon="user"
                  >
                    Profile
                  </Button>
                }
                title={data.me.username}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomRight"
              >
                <Button type="primary" shape="circle" size="large">
                  {data.me.username.charAt(0).toUpperCase()}
                </Button>
              </Popover>
            )
          } else {
            return <div>error</div>
          }
        }}
      </Query>
    )
  }
}

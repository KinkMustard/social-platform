import * as React from "react";
import { Card, Icon, Modal } from "antd";
import { withFindListings, WithFindListings } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
// import { Link } from "react-router-dom";
import { VoteButton } from "../vote/VoteButton";

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithFindListings
  > {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
    this.setState({
      visible: false
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.props.history.push("/listings");
    this.setState({
      visible: false
    });
  };
  render() {
    const { listings, loading, refetchListings } = this.props;
    return (
      <React.Fragment>
        {loading && <div>...loading</div>}
        {listings.map(l => (
          <div
            style={{
              display: "flex",
              margin: "auto",
              marginLeft: "20vw",
              marginRight: "20vw"
            }}
          >
            <VoteButton
              listingId={l.id}
              listingUpvotes={l.upvotes}
              listingDownvotes={l.downvotes}
              refetchListings={refetchListings}
            />
            <Card
              key={`${l.id}-card`}
              hoverable={true}
              style={{ width: 640, height: 695, marginBottom: 10 }}
              onClick={() => {
                // this.props.history.push(`/listing/${l.id}`);
                this.props.history.push(`/listings/${l.id}/modal`);
                // this.showModal();
              }}
              actions={[
                <Icon type="setting" key="1" />,
                <Icon type="edit" key="2" />,
                <Icon type="ellipsis" key="3" />
              ]}
            >
              <p style={{ fontSize: 14, marginBottom: 0 }}>
                posted by: {l.owner.email}
              </p>
              <p style={{ fontSize: 28 }}>{l.name}</p>

              {l.pictureUrl && (
                <img
                  alt="example"
                  src={l.pictureUrl}
                  style={{
                    display: "block",
                    maxWidth: 590,
                    maxHeight: 480,
                    width: "auto",
                    height: "auto",
                    margin: "auto"
                  }}
                />
              )}
              <p style={{ fontSize: 18, display: "inline" }}>
                {l.description}
                posted {distanceInWordsToNow(Number(l.datePosted))} ago
              </p>
            </Card>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {l.pictureUrl && (
                <img
                  alt="example"
                  src={l.pictureUrl}
                  style={{
                    display: "block",
                    maxWidth: 590,
                    maxHeight: 480,
                    width: "auto",
                    height: "auto",
                    margin: "auto"
                  }}
                />
              )}
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

import * as React from "react";
import { Card } from "antd";
import { withFindListings, WithFindListings } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
// import { Link } from "react-router-dom";

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithFindListings
  > {
  render() {
    const { listings, loading } = this.props;
    return (
      <div>
        {loading && <div>...loading</div>}
        {listings.map(l => (
          <Card
            key={`${l.id}-card`}
            hoverable={true}
            style={{ width: 640, margin: "auto", marginBottom: 10 }}
            onClick={() => {
              this.props.history.push(`/listing/${l.id}`);
            }}
          >
            <p style={{ fontSize: 28, display: "inline" }}>{l.name}</p>{" "}
            <p style={{ fontSize: 14, display: "inline", marginLeft: 20 }}>
              posted by: {l.owner.email}
            </p>
            {l.pictureUrl && (
              <img
                alt="example"
                src={l.pictureUrl}
                style={{
                  display: "block",
                  maxWidth: 590,
                  maxHeight: 500,
                  width: "auto",
                  height: "auto",
                  margin: "auto"
                }}
              />
            )}
            <p style={{ fontSize: 18, display: "inline" }}>{l.description}</p>
          </Card>
        ))}
      </div>
    );
  }
}

export const FindListingsConnector = withFindListings(C);

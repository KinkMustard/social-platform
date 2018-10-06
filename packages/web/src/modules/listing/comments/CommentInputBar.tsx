import * as React from "react";
import { Formik, Form, Field } from "formik";
import { CreateComment } from "@abb/controller";
import { InputField } from "../../shared/InputField";
import { Button } from "antd";

interface FormValues {
  text: string;
}

interface Props {
  listingId: string;
  refetchComments: any;
}

export class InputBar extends React.PureComponent<Props> {
  state = {
    loading: false
  };

  render() {
    const { listingId, refetchComments } = this.props;
    return (
      <CreateComment>
        {({ createComment }) => (
          <Formik<{}, FormValues>
            initialValues={{ text: "" }}
            onSubmit={async ({ text }, { resetForm }) => {
              this.setState({ loading: true });
              await createComment({
                variables: {
                  comment: {
                    text,
                    listingId
                  }
                }
              });

              resetForm();
              refetchComments();
              this.setState({ loading: false });
            }}
          >
            {() => (
              <Form>
                <Field
                  name="text"
                  placeholder="Comment what you think."
                  component={InputField}
                  useTextAreaComponent={true}
                  autosize={{ minRows: 4 }}
                  style={{ overlap: "hide" }}
                />
                <div
                  style={{
                    margin: 0,
                    height: 60,
                    marginTop: -35,
                    border: "1px solid #e9e9e9",
                    borderRadius: "6px",
                    backgroundColor: "#fafafa"
                  }}
                >
                  <Button
                    style={{ float: "right", marginRight: 10, marginTop: 18 }}
                    loading={this.state.loading}
                    htmlType="submit"
                  >
                    Comment
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CreateComment>
    );
  }
}

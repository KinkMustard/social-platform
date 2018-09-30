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
                />
                <Button loading={this.state.loading} htmlType="submit">
                  send comment
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </CreateComment>
    );
  }
}

import * as React from "react";
import { Form as AntForm, Button, Card } from "antd";
import { Form, Formik, FormikActions } from "formik";
import { ImageFile } from "react-dropzone";

import { Page1 } from "./ui/Page1";

const FormItem = AntForm.Item;

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: ImageFile | null;
  datePosted: string;
  name: string;
  description: string;
  upvotes: number;
  downvotes: number;
}

interface State {
  page: number;
}

interface Props {
  initialValues?: ListingFormValues;
  submit: (
    data: ListingFormValues,
    actions: FormikActions<ListingFormValues>
  ) => Promise<void>;
}

// tslint:disable-next-line:jsx-key
const pages = [<Page1 />];

export const defaultListingFormValues = {
  pictureUrl: null,
  picture: null,
  datePosted: "",
  name: "",
  description: "",
  upvotes: 0,
  downvotes: 0
};

export class ListingForm extends React.PureComponent<Props, State> {
  state = {
    page: 0
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  render() {
    const { submit, initialValues = defaultListingFormValues } = this.props;

    return (
      <Formik<{}, ListingFormValues>
        initialValues={initialValues}
        onSubmit={submit}
      >
        {({ isSubmitting, values }) =>
          console.log(values) || (
            <div
              style={{
                background: "#f5f5f5",
                padding: "30px",
                width: "100%",
                height: "100vh",
                left: 0
              }}
            >
              <Card
                title="New Post"
                bordered={false}
                style={{ width: 800, margin: "auto", textAlign: "center" }}
              >
                <Form style={{ display: "flex" }}>
                  <div style={{ width: 600, margin: "auto" }}>
                    {pages[this.state.page]}
                    <FormItem>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end"
                        }}
                      >
                        {this.state.page === pages.length - 1 ? (
                          <div>
                            <Button
                              type="primary"
                              htmlType="submit"
                              disabled={isSubmitting}
                            >
                              Create Post
                            </Button>
                          </div>
                        ) : (
                          <Button type="primary" onClick={this.nextPage}>
                            next page
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  </div>
                </Form>
              </Card>
            </div>
          )
        }
      </Formik>
    );
  }
}

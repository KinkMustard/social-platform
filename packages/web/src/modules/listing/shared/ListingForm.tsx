import * as React from "react";
import { Form as AntForm, Button } from "antd";
import { Form, Formik, FormikActions } from "formik";
import { ImageFile } from "react-dropzone";

import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";

const FormItem = AntForm.Item;

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: ImageFile | null;
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
const pages = [<Page1 />, <Page2 />];

export const defaultListingFormValues = {
  pictureUrl: null,
  picture: null,
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
                          create listing
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
          )
        }
      </Formik>
    );
  }
}

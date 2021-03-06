import * as React from "react";
import { Formik, Field, FormikActions } from "formik";
import { withCreateListing, WithCreateListing } from "@abb/controller";
import { RouteComponentProps } from "react-router-native";
import { Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { InputField } from "../../shared/InputField";
import { CheckboxGroupField } from "../../shared/CheckboxGroupField";
import { PictureField } from "../../shared/PictureField";

interface FormValues {
  picture: null;
  name: string;
  description: string;
  upvotes: string;
  downvotes: string;
}

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing
  > {
  submit = async (
    { upvotes, downvotes, ...values }: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log(values);
    await this.props.createListing({
      ...values,
      upvotes: parseInt(upvotes, 10),
      downvotes: parseInt(downvotes, 10)
    });
    setSubmitting(false);
  };

  render() {
    return (
      <Formik<{}, FormValues>
        initialValues={{
          picture: null,
          name: "",
          description: "",
          upvotes: "0",
          downvotes: "0"
        }}
        onSubmit={this.submit}
      >
        {({ handleSubmit, values }) =>
          console.log(values) || (
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>
                Create Listing
              </Text>
              <Field name="name" placeholder="Name" component={InputField} />
              <Field
                name="picture"
                title="pick a picture"
                component={PictureField as any}
              />
              <Field
                name="description"
                placeholder="Description"
                component={InputField}
              />
              <Button onPress={handleSubmit} title="save listing" />
            </ScrollView>
          )
        }
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);

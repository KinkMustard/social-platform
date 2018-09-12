import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../../modules/shared/InputField";

export const Page2 = () => (
  <React.Fragment>
    <Field
      label="Upvotes"
      name="upvotes"
      placeholder="Upvotes"
      component={InputField}
      useNumberComponent={true}
    />
    <Field
      label="Downvotes"
      name="downvotes"
      placeholder="Downvotes"
      component={InputField}
      useNumberComponent={true}
    />
  </React.Fragment>
);

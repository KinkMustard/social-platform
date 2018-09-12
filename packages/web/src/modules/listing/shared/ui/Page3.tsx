import * as React from "react";
import { Field } from "formik";

import { TagField } from "../../../shared/TagField";

export const Page3 = () => (
  <>
    <Field name="amenities" placeholder="Amenities" component={TagField} />
  </>
);

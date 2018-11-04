import * as React from "react";
import { Form as AntForm, Icon, Button, Card } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { loginSchema } from "@abb/common";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@abb/controller";

import { InputField } from "../../shared/InputField";

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <div
        style={{
          backgroundColor: "rgb(2,0,36)",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0
        }}
      >
        <Card
          title="Login"
          bordered={false}
          style={{
            width: "400px",
            margin: "auto",
            marginTop: "20vh"
          }}
        >
          <Form style={{ display: "flex" }}>
            <div style={{ width: 400, margin: "auto" }}>
              <Field
                name="email"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                placeholder="Email or username"
                component={InputField}
              />
              <Field
                name="password"
                type="password"
                prefix={
                  (
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                placeholder="Password"
                component={InputField}
              />
              <FormItem>
                <Link to="/forgot-password">Forgot password</Link>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </FormItem>
              <FormItem>
                Or <Link to="/register">register</Link>
              </FormItem>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);

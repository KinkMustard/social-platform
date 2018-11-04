import * as React from "react";
import { Form as AntForm, Icon, Button, Card } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@abb/controller";

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
          backgroundColor: "rgb(131,58,180)",
          background:
            "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      >
        <Card
          title="Register"
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
                name="username"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                placeholder="Username"
                component={InputField}
              />
              <Field
                name="email"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                placeholder="Email"
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
                  Register
                </Button>
              </FormItem>
              <FormItem>
                Or <Link to="/login">login now!</Link>
              </FormItem>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
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

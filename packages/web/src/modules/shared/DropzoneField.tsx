import * as React from "react";
import { FieldProps } from "formik";
import Dropzone from "react-dropzone";
import { Button } from "antd";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name, value },
  form: { setFieldValue, values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const pUrl = (value ? value.preview : null) || values.pictureUrl;
  return (
    <div>
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        onDrop={([file]) => {
          setFieldValue(name, file);
        }}
        style={{
          width: "600px",
          height: "450px",
          borderWidth: "2px",
          borderColor: "#1890ff",
          borderStyle: "dashed",
          borderRadius: "5px",
          backgroundColor: "#e6f7ff",
          textAlign: "center",
          lineHeight: "450px",
          cursor: "pointer"
        }}
        acceptStyle={{
          width: "600px",
          height: "450px",
          borderWidth: "2px",
          borderColor: "#52c41a",
          borderStyle: "solid",
          borderRadius: "5px",
          backgroundColor: "#f6ffed",
          cursor: "pointer"
        }}
        rejectStyle={{
          width: "600px",
          height: "450px",
          borderWidth: "2px",
          borderColor: "#f5222d",
          borderStyle: "solid",
          borderRadius: "5px",
          backgroundColor: "#fff1f0",
          cursor: "pointer"
        }}
        {...props}
      >
        {pUrl ? (
          <img
            src={pUrl}
            style={{
              maxHeight: "400px",
              maxWidth: "550px",
              width: "auto",
              height: "auto",
              marginTop: -10
            }}
          />
        ) : (
          <p
            style={{
              fontSize: "20px"
            }}
          >
            Drag and drop an image here or click to upload it (optional)
          </p>
        )}
      </Dropzone>

      <Button
        onClick={() =>
          setValues({
            ...values,
            pictureUrl: null,
            picture: null
          })
        }
      >
        remove
      </Button>
    </div>
  );
};

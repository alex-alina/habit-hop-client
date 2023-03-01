import { useField } from 'formik';
import React from 'react';
import Div from '../core-components/Div';
import { TextInput } from '../core-components/Input';
import Label from '../core-components/Label';
import Paragraph from '../core-components/Paragraph';

const TextField = ({ label, ...props }) => {
  const [field, meta /*helpers*/] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Label>{label}</Label>
      <TextInput {...field} {...props} />
      <Div>
        {meta.touched && meta.error ? (
          <Paragraph mb={2} color="error">
            {meta.error}
          </Paragraph>
        ) : null}
      </Div>
    </Div>
  );
};

export { TextField };

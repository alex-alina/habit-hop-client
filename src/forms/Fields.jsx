import { useField } from 'formik';
import React from 'react';
import Div from '../core-components/Div';
import { Input } from '../core-components/Input';
import Label from '../core-components/Label';
import Paragraph from '../core-components/Paragraph';
import Select from '../core-components/Select';
import Textarea from '../core-components/Textarea';

const InputField = ({ label, ...props }) => {
  const [field, meta /*helpers*/] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Label htmlFor={field.name}>{label}</Label>
      <Input id={field.name} {...field} {...props} />
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

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Label htmlFor={field.name}>{label}</Label>
      <Textarea id={field.name} {...field} {...props} />
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

const SelectField = ({ label, options, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        options={options}
        placeholder={placeholder}
        id={field.name}
        {...field}
        {...props}
      />
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

export { InputField, TextArea, SelectField };

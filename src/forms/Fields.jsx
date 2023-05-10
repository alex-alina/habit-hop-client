import { useField } from 'formik';
import React from 'react';
import Div from '../core-components/Div';
import Input from '../core-components/Input';
import Label from '../core-components/Label';
import Legend from '../core-components/Legend';
import Paragraph from '../core-components/Paragraph';
import Select from '../core-components/Select';
import Textarea from '../core-components/Textarea';
import Radio from '../components/Radio';

const RadioGroup = ({ legend, options, ...props }) => {
  const [field, meta /*helpers*/] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Legend>{legend}</Legend>

      {options.map((option, i) => {
        const id = `${option}-${i + 1}`;
        return (
          <Div display="flex" alignItems="center" key={i} ml={2} mb={2}>
            <Radio id={id} {...field} {...props} />
            <Label htmlFor={id} mb={0} ml={2} fontSize={3}>
              {option}
            </Label>
          </Div>
        );
      })}

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

export { InputField, RadioGroup, SelectField, TextArea };

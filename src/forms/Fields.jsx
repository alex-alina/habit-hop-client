import { useField } from 'formik';
import React from 'react';
import FieldError from '../components/FieldError';
import Radio from '../components/Radio';
import Div from '../core-components/Div';
import Input from '../core-components/Input';
import Label from '../core-components/Label';
import Legend from '../core-components/Legend';
import Select from '../core-components/Select';
import Textarea from '../core-components/Textarea';

const RadioField = ({ id, label, name, value, ...props }) => {
  const [field] = useField({
    name: name,
    type: 'radio',
    value: value,
    ...props,
  });
  return (
    <Div display="flex" alignItems="center" ml={2} mb={2}>
      <Radio id={id} {...field} {...props} />
      <Label htmlFor={id} mb={0} ml={1} mr={2} fontSize={3}>
        {label}
      </Label>
    </Div>
  );
};

const RadioGroup = ({
  legend,
  legendProps,
  radios,
  name,
  radiosDirection = 'column',
  ...props
}) => {
  return (
    <Div display="flex" flexDirection="column" mb={2} role="group">
      <Legend {...legendProps}>{legend}</Legend>
      <Div ml={2} display="flex" flexDirection={radiosDirection}>
        {radios.map((radio, i) => {
          const id = `${radio.label}-${i + 1}`;
          return (
            <RadioField
              key={id}
              id={id}
              label={radio.label}
              name={name}
              value={radio.value}
              {...props}
            />
          );
        })}
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
          <FieldError>{meta.error}</FieldError>
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
          <FieldError>{meta.error}</FieldError>
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
          <FieldError>{meta.error}</FieldError>
        ) : null}
      </Div>
    </Div>
  );
};

export { InputField, RadioGroup, SelectField, TextArea };

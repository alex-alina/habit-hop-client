import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import FieldError from '../components/FieldError';
import Button from '../core-components/Button';
import Label from '../core-components/Label';
import { validateHabitForm } from '../utils/validation';
import { RadioGroup, TextArea } from './Fields';

const HabitForm = ({
  content,
  habit,
  goalId,
  handleSubmit,
  handleCloseOverlay,
}) => {
  const initialValues = {
    habitDescription: habit ? habit.habitDescription : '',
    habitType: habit ? habit.habitType : '',
    progressMetric: habit ? habit.progressMetric : '',
  };

  const { habitDescription, habitTypeInput, progressMetricSection, button } =
    content;

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateHabitForm(values)}
      onSubmit={(values, actions) => {
        habit
          ? handleSubmit(values, habit.id, goalId)
          : handleSubmit(values, goalId);
        handleCloseOverlay && handleCloseOverlay();
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, submitForm }) => {
        return (
          <Form
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              background: 'white',
              maxWidth: 400,
              width: '80%',
              marginTop: 10,
              marginBottom: 20,
              padding: 30,
              borderRadius: 10,
            }}
          >
            <TextArea
              name="habitDescription"
              label={habitDescription.label}
              placeholder={habitDescription.placeholder}
              height={100}
              maxWidth={380}
              maxlength={300}
            />

            <RadioGroup
              name="habitType"
              legend={habitTypeInput.legend}
              radios={habitTypeInput.radios}
            />
            <ErrorMessage name="habitType" component={FieldError} />

            <Label mt={2}>{progressMetricSection.title}</Label>
            {progressMetricSection.radioGroups.map((radioGroup, i) => (
              <RadioGroup
                key={i}
                name="progressMetric"
                legend={radioGroup.legend}
                legendProps={{ fontSize: 3, ml: 3 }}
                radios={radioGroup.radios}
                radiosDirection="row"
              />
            ))}
            <ErrorMessage name="progressMetric" component={FieldError} />

            <Button
              variant="primaryMd"
              my={[4, 4, 3, 4, 4]}
              mx="auto"
              disabled={isSubmitting}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              {button}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HabitForm;

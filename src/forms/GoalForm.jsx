import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../core-components/Button';
import { TextField, TextArea, SelectField } from './Fields';
import { goalsScreen } from '../text/text';

const GOAL_PRIORITIES = ['main', 'secondary', 'tertiary'];
const { goalDescription, startdateInput, endDateInput, select, button } =
  goalsScreen.goalsForm;

const GoalForm = ({ goal, handleSubmit }) => {
  const initialValues = {
    goalDefinition: goal ? goal.goalDefinition : '',
    priority: goal ? goal.priority : '',
    startDate: goal ? goal.startDate : '',
    endDate: goal ? goal.endDate : '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmit(values);
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
              marginTop: 20,
              padding: 30,
              borderRadius: 10,
            }}
          >
            <TextArea
              name="goalDefinition"
              label={goalDescription.label}
              placeholder={goalDescription.placeholder}
              height={60}
              maxlength={300}
            />
            <SelectField
              name="priority"
              label={select.label}
              options={GOAL_PRIORITIES}
              placeholder={select.placeholder}
            />
            <TextField
              name="startDate"
              type="date"
              label={startdateInput.label}
              placeholder={startdateInput.placeholder}
            />
            <TextField
              name="endDate"
              type="date"
              label={endDateInput.label}
              placeholder={endDateInput.placeholder}
            />

            <Button
              variant="primaryMd"
              my={[4, 4, 3, 5, 5]}
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

export default GoalForm;

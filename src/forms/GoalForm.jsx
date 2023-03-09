import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import Button from '../core-components/Button';
// import Paragraph from '../core-components/Paragraph';
// import { loginScreen } from '../text/text';
import { TextField, TextArea } from './Fields';
// import Textarea from '../core-components/Textarea';

const GoalForm = ({ goal = {}, handleSubmit }) => {
  // const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.items);
  const maxGoalsNum = useSelector((state) => state.goals.maxGoalsNum);
  const newGoalsLeft = maxGoalsNum - goals.length;
  console.log(goal);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        // dispatch(loginUser(values));
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
            }}
          >
            <TextArea
              name="goalDescription"
              label={`You can add ${newGoalsLeft} out of ${maxGoalsNum} goals`}
              placeholder="Go SMART"
              width={[300, 300, 300, 300, 350]}
              maxWidth={350}
              height={90}
              maxlength={300}
            />
            <TextField
              name="startDate"
              type="date"
              label="Start date"
              placeholder="YYY-MM-DD"
            />
            <TextField
              name="endDate"
              type="date"
              label="End date"
              placeholder="YYY-MM-DD"
            />

            <Button
              variant="secondaryMd"
              my={[4, 4, 3, 5, 5]}
              mx="auto"
              disabled={isSubmitting}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              Add goal
            </Button>
            {/* {loginStatus === 'success' ? (
              <Navigate replace to="/goals" />
            ) : null} */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default GoalForm;

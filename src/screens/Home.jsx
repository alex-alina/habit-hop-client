import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PlantOne } from '../assets/illustrations/Humaaans - Plant 1.svg';
import { ReactComponent as PlantTwo } from '../assets/illustrations/Humaaans - Plant 2.svg';
import { ReactComponent as Human } from '../assets/illustrations/standing-23.svg';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import { homeScreen } from '../text/text';

const Home = ({ content = homeScreen }) => {
  const { intro, loginBtn, signupBtn } = content;

  return (
    <Div
      height="auto"
      minHeight="100vh"
      bg="white"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      p={[2, 2, 5, 0, 0]}
    >
      <Heading
        color="heading"
        as="h1"
        fontWeight={1}
        fontSize={[6, 6, 7, 7, 7]}
        fontFamily="heading"
        mb={[0, 0, 3, 4, 4]}
      >
        {intro}
      </Heading>
      <Div display="flex" justifyContent="space-around" alignItems="flex-end">
        <Div display={['none', 'none', 'none', 'none', 'block']}>
          <PlantOne width={300} height={400} aria-hidden="true" />
        </Div>
        <Div>
          <Human
            style={{ width: 'auto', maxWidth: 300, maxHeight: 400 }}
            aria-hidden="true"
          />
        </Div>
        <Div display={['none', 'none', 'none', 'none', 'block']}>
          <PlantTwo width={300} height={500} aria-hidden="true" />
        </Div>
      </Div>

      <Div
        display="flex"
        alignItems="center"
        flexDirection={['column', 'column', 'row', 'row', 'row']}
        mt={[7]}
      >
        <Link to="/signup">
          <Button variant="primaryLg" mr={[0, 0, 5, 5, 5]} mb={[4, 4, 0, 0, 0]}>
            {signupBtn}
          </Button>
        </Link>

        <Link to="/login">
          <Button variant="secondaryLg">{loginBtn}</Button>
        </Link>
      </Div>
    </Div>
  );
};

export default Home;

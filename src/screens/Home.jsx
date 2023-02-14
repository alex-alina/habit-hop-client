import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Heading from '../core-components/Heading';
import Div from '../core-components/Div';

const Home = () => {
  const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setData(data.results[0]);
      });
  }, []);

  return (
    <>
      <Div
        my={2}
        width={[200, 250, 450, 600, 950]}
        bg="warning"
        border="1px solid transparent"
        borderRadius={[1, 1, 2, 2]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {data ? (
          <Div
            display="flex"
            flexDirection="column"
            justifyContent="center"
            my={2}
          >
            <Div>{data.name.first}</Div>
            <Div>{data.name.last} </Div>
          </Div>
        ) : (
          'no data here'
        )}
        {/* <Heading
          my={4}
          mr={2}
          color="danger"
          as="h4"
          fontWeight={1}
          fontSize={[1, 1, 6, 6]}
          fontFamily="heading"
        >
          Hello yellow
        </Heading>
        <Heading
          my={4}
          color="white"
          as="h4"
          fontWeight={1}
          fontSize={[1, 1, 6, 6]}
          fontFamily="body"
        >
          Hello white
        </Heading> */}
      </Div>
      <Div
        display="flex"
        alignItems="center"
        flexDirection="column"
        width={[250, 650, 650, 950]}
      >
        <Div my={2} color="danger" fontSize={8}>
          Welcome home, duckie
        </Div>
        <Div>
          <Link to="/signup">
            <button>Go to signup page</button>
          </Link>
        </Div>
      </Div>
    </>
  );
};

export default Home;

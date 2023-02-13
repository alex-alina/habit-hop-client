import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> |{' '}
        <Link to="/goals">Goals</Link>
      </nav>
    </div>
  );
}

export default Navigation;

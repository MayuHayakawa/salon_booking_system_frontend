import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsCalendar4Week } from 'react-icons/bs';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 7rem;
  background-color: white;
  border-bottom: solid 1px #bf958d;
  ul {
    height: 100%;
    padding: 0 3rem;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 2.5rem;
    }
    div {
      display: flex;
      gap: 2rem;
      h2 {
        cursor: pointer;
      }
      li {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
  }
`

const Navbar = () => {
  const user = useSelector(state => state.user);

  return (
    <Nav>
      <ul>
        <h1>
          <Link to="/">Salon Booking</Link>
        </h1>
        <div>
          { user.data != null ? (
            <h2>Hi {user.data && user.data.firstName}!</h2>
          ):(
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          )}
          { user.data && user.data.email != 'admin@admin.com' && (
            <li>
              <BsCalendar4Week />
              <Link to="/menu">Book</Link>
            </li>
          )}
        </div>
      </ul>
    </Nav>
  )
}

export default Navbar
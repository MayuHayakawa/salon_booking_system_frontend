import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addMenuState } from "../../../redux/newbookingSlice";
import styled from 'styled-components';

const MenuCardContainer = styled.div`
  width: 30rem;
  height: 100%;
  margin-bottom: 2rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 0.3rem;
  background-color: white;
  border: solid 1px #434a54;
  border-radius: 5px;
  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  button {
    width: 6rem;
    height: 3rem;
    margin-top: 1rem;
    font-size: 1.3rem;
    font-family: 'Open Sans';
    font-weight: 600;
    color: white;
    background-color: #b14d59;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`

const MenuCard = (data) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertedTime = convertMinutesToTime(data.data.duration);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addMenuState(data.data));
    navigate('/menu/selectstaff');
  }

  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if(mins === 0) {
      const timeString = `${hours}hr`;
      return timeString;
    } else if(hours === 0) {
      const timeString = `${mins}min`;
      return timeString;
    } else {
      const timeString = `${hours}hr${mins}min`;
      return timeString;
    }
  }

  return (
    <MenuCardContainer>
      <h2>{data.data.menuname}</h2>
      <div>
        <h3>{convertedTime}</h3>
        <h3>CA${data.data.price}</h3>
      </div>
      <p>{data.data.description}</p>
      <button onClick={handleClick}>Book</button>
    </MenuCardContainer>
  )
}

export default MenuCard
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addStaffState } from '../../../redux/newbookingSlice';
import styled from 'styled-components';

const StaffCardContainer = styled.div`
  width: 30rem;
  height: 100%;
  margin-bottom: 2rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  gap: 3rem;
  background-color: white;
  border: solid 1px #434a54;
  border-radius: 5px;
  .staffInfo{
    display: flex;
    align-items: center;
    gap: 1rem;
    /* .image {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      background-color: pink;
    } */
    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
  }
  
  button {
    height: 3rem;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1rem;
    font-family: 'Open Sans';
    font-weight: 600;
    color: white;
    background-color: #b14d59;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`


const StaffCard = (data) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addStaffState(data.data));
    dispatch(navigate('/menu/pickatime'));
  };

  return (
    <StaffCardContainer>
      <div className='staffInfo'>
        <div className='image'>
          {/* <img src={data.data.avatar} alt={data.data.staffName} /> */}
        </div>
        <div>
          <h2>{data.data.staffName}</h2>
          <p>{data.data.bio}</p>
        </div>
      </div>
      <button onClick={handleClick}>select</button>
    </StaffCardContainer>
  )
}

export default StaffCard
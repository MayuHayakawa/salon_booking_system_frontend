import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMenu } from '../../redux/menuSlice';
import { getAllStaff } from '../../redux/allStaffSlice';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  div {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const Home = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMenu());
    dispatch(getAllStaff());
  },[dispatch]);
  
  return (
    <HomeContainer>
      <div>
        <img src='../src/assets/images/evie-s-bSVGnUCk4tk-unsplash.jpg' alt='background' />
      </div>
    </HomeContainer>
  )
}

export default Home
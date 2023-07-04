import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMenu } from '../../redux/menuSlice';
import MenuCardContainer from '../../components/Booking/Menu.jsx/MenuCardContainer';
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  h1 {
    padding-top: 2rem;
  }
`

const Menu = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMenu());
  },[dispatch]);

  return (
    <MenuContainer>
      <h1>SERVICES</h1>
      <MenuCardContainer />
    </MenuContainer>
  )
}

export default Menu
import { useSelector } from 'react-redux';
import MenuCard from './MenuCard';
import styled from 'styled-components';

const MenuCards = styled.div`
  margin-top: 2rem;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
  gap: 2rem;
`

const MenuCardContainer = () => {
  const menu = useSelector(state => state.menu.data);

  return (
    <MenuCards>
      { menu != null && menu.map((item) => {
        return <MenuCard key={item._id} data={item} />
      })}
    </MenuCards>
  )
}

export default MenuCardContainer
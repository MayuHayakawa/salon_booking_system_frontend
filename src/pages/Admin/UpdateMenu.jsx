import { useSelector } from "react-redux";
import AdminMenuCard from "../../components/AdminDashboard/AdminMenuCard";
import styled from 'styled-components';

const UpdateMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  h1 {
    padding-top: 2rem;
  }
`

const UpdateMenu = () => {
  const menu = useSelector(state => state.menu.data);

  return (
    <UpdateMenuContainer>
      <h1>UPDATE MENU</h1>
      { menu.map((item) => {
        return <AdminMenuCard key={item._id} data={item} />
      })}
    </UpdateMenuContainer>
  )
}

export default UpdateMenu
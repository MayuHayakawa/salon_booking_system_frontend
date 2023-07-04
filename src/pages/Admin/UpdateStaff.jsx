import { useSelector } from "react-redux";
import AdminStaffCard from "../../components/AdminDashboard/AdminStaffCard";
import styled from 'styled-components';

const UpdateStaffContainer = styled.div`
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
const UpdateStaff = () => {
  const allStaff = useSelector(state => state.allStaff.data);


  return (
    <UpdateStaffContainer>
      <h1>UPDATE STAFF INFORMATION</h1>
      { allStaff.map((staff) => {
        return <AdminStaffCard key={staff._id} data={staff} />
      })}
    </UpdateStaffContainer>
  )
}

export default UpdateStaff
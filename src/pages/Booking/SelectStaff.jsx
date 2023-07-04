import StaffCardContainer from '../../components/Booking/SelectStaff/StaffCardContainer';
import styled from 'styled-components';

const SelectStaffContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  h1 {
    padding: 2rem 0;
  }
`

const SelectStaff = () => {

  return (
    <SelectStaffContainer>
      <h1>SELECT STAFF</h1>
      <StaffCardContainer />
    </SelectStaffContainer>
  )
}

export default SelectStaff
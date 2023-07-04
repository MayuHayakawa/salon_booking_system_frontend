import { useSelector } from 'react-redux';
import StaffCard from './StaffCard';
import styled from 'styled-components';

const StaffCards = styled.div`
  margin-top: 2rem;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
  gap: 2rem;
`

const StaffCardContainer = () => {
  const allStaff = useSelector(state => state.allStaff.data);

  return (
    <StaffCards>
        { allStaff != null && allStaff.map((staff) => {
          return <StaffCard key={staff._id} data={staff} />
        })}
    </StaffCards>
  )
}

export default StaffCardContainer
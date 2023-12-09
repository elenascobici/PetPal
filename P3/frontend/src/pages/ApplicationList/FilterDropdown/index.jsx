import Dropdown from 'react-bootstrap/Dropdown';

function FilterDropdown({setParam, query}) {
    const addParameter = (newStatus) => {
        // const value = event.target.value;
        setParam({...query, status: newStatus, page: 1});
    }
   return (
    <Dropdown onSelect={addParameter}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Filter by Status
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="">All</Dropdown.Item>
        <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
        <Dropdown.Item eventKey="accepted">Accepted</Dropdown.Item>
        <Dropdown.Item eventKey="declined">Declined</Dropdown.Item>
        <Dropdown.Item eventKey="withdrawn">Withdrawn</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterDropdown;
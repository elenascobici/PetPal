import Dropdown from 'react-bootstrap/Dropdown';

function SortDropdown({setParam, query}) {
  const addParameter = (newTime) => {
    // const value = event.target.value;
    setParam({...query, type: newTime});
  }
  return (
    <Dropdown onSelect={addParameter}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Sort by Time
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="creation-time">Creation time</Dropdown.Item>
        <Dropdown.Item eventKey="last-update">Last Update time</Dropdown.Item>
        <Dropdown.Item eventKey="">Default</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;

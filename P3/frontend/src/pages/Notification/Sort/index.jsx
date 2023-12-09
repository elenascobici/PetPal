import Dropdown from 'react-bootstrap/Dropdown';

function Sort({query, setSearch}){
    const addParameter = (newTime) => {
        // const value = event.target.value;
        setSearch({...query, sort: newTime});
      }
      return (
        <Dropdown onSelect={addParameter}>
          <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
            Sort
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item eventKey="creation-time">Most Recent</Dropdown.Item>
            <Dropdown.Item eventKey="">Default</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
}

export default Sort;
import Dropdown from 'react-bootstrap/Dropdown';

function Filters({read, setRead}){
    const addParameter = (newStatus) => {
        // const value = event.target.value;
        setRead({...read, filter: newStatus});
    }
   return (
    <Dropdown onSelect={addParameter}>
    {/* <Dropdown> */}
      <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="">All</Dropdown.Item>
        <Dropdown.Item eventKey="read">Read</Dropdown.Item>
        <Dropdown.Item eventKey="unread">Unread</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   );
}

export default Filters;
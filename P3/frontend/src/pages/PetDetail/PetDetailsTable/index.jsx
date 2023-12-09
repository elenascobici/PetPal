const PetDetailsTable = ({ details }) => {

  const filteredDetails = Object.entries(details).reduce((acc, [key, value]) => {
    if (key !== "description" && key !== "medical_history" && key !== "pet_image_1" && key !== "id"  && key !== "deadline" ) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return (
    <div className="col-12 col-lg-5 d-flex align-items-center">
      <table className="table bg-lightYellow rounded-table m-auto" id="subtitle">
        <thead>
          <tr>
            <th colSpan="2" >Details</th>
          </tr>
          
        </thead>
        <tbody>
          
          {Object.entries(filteredDetails).map(([key, value]) => (
            <tr key={key}> 
              <td><strong>{capitalizeFirstLetter(key.replace(/_/g, ' '))}</strong></td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetDetailsTable;

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
}

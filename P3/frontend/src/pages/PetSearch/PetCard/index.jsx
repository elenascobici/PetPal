import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function PetCard({ pet }) {
  const navigate = useNavigate();
  // const imageUrl = `http://localhost:8000/media/pets/${pet.pet_image_1}`;

  const handleUpdateClick = () => {
    navigate(`/pet/${pet.id}/update`); 
};

  return (
    <div className="grid-item grid-item-inner">
      {/* Use the Link component to navigate to the pet detail route */}
      <Link to={`/pets/${pet.id}`} className="pet">
        {/* <img className="petImage" src={imageUrl} alt={pet.name} /> */}
        <div className="petLabel">{pet.name}</div>
      </Link>
      <p className="status">
        {pet.status}
      </p>
      <button class="update" onClick={handleUpdateClick}>Update</button>
    </div>
  );
}

export default PetCard;

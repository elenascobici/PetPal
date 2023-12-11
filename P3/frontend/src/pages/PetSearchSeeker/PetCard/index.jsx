import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function PetCard({ pet }) {
  const navigate = useNavigate();
  // const imageUrl = `https://petpal-production.up.railway.app/media/pets/${pet.pet_image_1}`;


  return (
    <div className="grid-item grid-item-inner">
      <Link to={`/pets/${pet.id}`} className="pet">
        {/* <img className="petImage" src={imageUrl} alt={pet.name} /> */}
        <div className="petLabel">{pet.name}</div>
      </Link>
      <p className="status">
        {pet.status}
      </p>
      
    </div>
  );
}

export default PetCard;

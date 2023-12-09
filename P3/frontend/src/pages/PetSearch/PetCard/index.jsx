function PetCard({ pet }) {
  // Placeholder image URL - replace with your own or dynamic URL if available
  const imageUrl = `http://localhost:8000/media/pets/${pet.pet_image_1}`;

  return (
    <div className="grid petGrid">
      <div className="grid-item">
          <a type="button" className="pet" href="#">
              <img className="petImage" src={imageUrl} alt={pet.name} />
          </a>
          <p className="status">
            {pet.status} </p>
        
      </div>
    </div>
  );
}


export default PetCard;

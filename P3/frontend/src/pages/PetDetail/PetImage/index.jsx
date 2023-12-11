const PetImage = ({ images }) => {
  // Ensure images is a string and construct the URL
  const imageUrl = `https://petpal-production.up.railway.app/pet/pet-image/` + (typeof images === 'string' ? images.split('/').pop() : '');;


  return (
    <div className="col-12 col-lg-6 image-box">
      <img src={imageUrl} alt="Main Image" className="img-fluid custom-rounded" />
    </div>
  );
};

export default PetImage;



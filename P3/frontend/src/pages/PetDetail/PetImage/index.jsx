const PetImage = ({ images }) => {
  return (
    <div className="col-12 col-lg-7">
      <img src={images.main} alt="Main Image" className="img-fluid custom-rounded" />
    </div>
  );
};

export default PetImage;

const PetDescription = ({ title, content }) => {
  return (
    <div className="col-12 description-box" id="subtitle">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
};

export default PetDescription;

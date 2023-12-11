const AdoptButton = ({ status, onAdopt }) => {
  return (
    <div className="col-12 padding">
      <button className={`btn ${status === 'Available' ? 'tealButton' : 'greyButton'}`} onClick={onAdopt}>
        Adopt!
      </button>
    </div>
  );
};

export default AdoptButton;

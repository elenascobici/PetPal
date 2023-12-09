const AdoptButton = ({ link, status }) => {
  const buttonClass = status === "Available" ? "tealButton" : "greybox";

  return (
    <div className="col-12 padding">
      <a className={buttonClass} href={link}>{status === "Available" ? "Adopt!" : "Not Available"}</a>
    </div>
  );
};

export default AdoptButton;

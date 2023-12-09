const ShelterRow = ({shelter, key}) => {
    const mailTo = "mailto:" + shelter.email;
    return (
        <>
        <div class="grid-item shelterLink">
        <a href="shelter-detail.html" class="shelterLink">{shelter.name}</a>
        </div>
        <div class="grid-item">{shelter.street}</div>
        <div class="grid-item">
        <a class="email" href={mailTo}>{shelter.email}</a> 
        </div>
        </>
    )
}

export default ShelterRow;
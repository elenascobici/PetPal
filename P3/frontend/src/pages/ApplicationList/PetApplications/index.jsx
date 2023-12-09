import PetCard from "../PetCard";

function PetApplications({listings, totalPets}){
    return <>

        <div className="pet-grid">
            {listings.map((listing, index) => (
                <PetCard listing={listing} key={listing.id}/>
            ))}


            { totalPets !== 0 && Array.from({ length: Math.max(8 - listings.length, 0) }).map((_, index) => (
                <PetCard listing={{fill: true}} key={index} />
            ))}

        </div>
    </>;
}

export default PetApplications;
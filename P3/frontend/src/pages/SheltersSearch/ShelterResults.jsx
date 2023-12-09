import ShelterRow from "./ShelterRow";

function ShelterResults({shelters, total}){
    console.log(shelters);
    return <>
        <div className="pet-grid">
            {shelters.map((shelter, index) => (
                <ShelterRow shelter={shelter} key={index}/>
            ))}


            { total !== 0 && Array.from({ length: Math.max(8 - shelters.length, 0) }).map((_, index) => (
                <ShelterRow shelter={{fill: true}} key={index} />
            ))}

        </div>
    </>;
}

export default ShelterResults;
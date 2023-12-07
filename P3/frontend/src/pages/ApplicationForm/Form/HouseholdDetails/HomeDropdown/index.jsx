import '../../../style.css';

function HomeDropdown(){
    const homeOptions = [
        {value: 'SFH', label: 'Single-Family Home'},
        {value: 'APT', label:'Apartment'},
        {value: 'CON', label:'Condominium'},
        {value: 'TNH', label: 'Townhouse'},
        {value: 'DUP', label:'Duplex'},
        {value: 'TRI', label:'Triplex'},
        {value: 'MOH', label: 'Mobile Home'},
        {value: 'TIN', label:'Tiny House'},
        {value: 'MAN', label:'Mansion'},
        {value: 'BUN', label: 'Bungalow'},
        {value: 'LOG', label:'Log House'},
        {value: 'FLO', label:'Floating Home'},
        {value: 'IGL', label:'Igloo'},
    ]
    
    return <>
        <select class="form-control" id="homeType" required>
            <option value="" selected disabled>Select Home Type</option>
            {homeOptions.map((home) => (
                <option key={home.value} value={home.value}>
                    {home.label}
                </option>
            ))}
        </select>
    </>;
}

export default HomeDropdown;
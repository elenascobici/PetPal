import '../../../style.css';

function ProvinceDropdown({tofill, fill}){

    const provinceOptions = [
        {value: 'AL', label: 'Alberta'},
        {value: 'BC', label:'British Columbia'},
        {value: 'MB', label:'Manitoba'},
        {value: 'NB', label: 'New Brunswick'},
        {value: 'NW', label:'Newfoundland and Labrador'},
        {value: 'NS', label:'Nova Scotia'},
        {value: 'ON', label: 'Ontario'},
        {value: 'PE', label:'Prince Edward Island'},
        {value: 'QB', label:'Quebec'},
        {value: 'SK', label: 'Saskatchewan'},
        {value: 'NT', label:'Northwest Territories'},
        {value: 'NU', label:'Nunavut'},
        {value: 'YK', label:'Yukon'},
    ]

    const storeInput = (event) => {
        const choice = event.target.value;

        // Put into parent
            fill({
                ...tofill,
                province: choice
            })
    }
    
    return <>
        <select className="form-control" id="province" onChange={storeInput} required>
            <option value="" selected disabled>Select Province</option>
            {provinceOptions.map((province) => (
                <option key={province.value} value={province.value}>
                    {province.label}
                </option>
            ))}
        </select>
    </>;
}

export default ProvinceDropdown;
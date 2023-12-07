import '../../style.css';

function Phone(){
    return <>
        <div class="row mb-3">
            <label for="phone" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Phone Number</label>
            <div class="col-12 mb-2 col-lg-10">
                <input type="phoneNumber" class="form-control" id="phoneNumber" placeholder="Number" required></input>
            </div>
        </div>
    </>
}

export default Phone;
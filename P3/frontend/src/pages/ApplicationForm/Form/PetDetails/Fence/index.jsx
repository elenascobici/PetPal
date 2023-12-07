import '../../../style.css';

function Fence(){
    return <>
        <div class="row mb-3">
            <label for="fence" class="col-12 col-form-label text-start col-lg-2 text-lg-end"> Do you have a fenced yard?</label>
            <div class="col-12 col-lg-10" style={{paddingTop: '7px', paddingBottom: '7px'}}>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="fence"/>
                <label class="form-check-label" for="fence"> Yes </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="fence"/>
                <label class="form-check-label" for="fence"> No </label>
              </div>
            </div>
          </div>
    </>
}

export default Fence;
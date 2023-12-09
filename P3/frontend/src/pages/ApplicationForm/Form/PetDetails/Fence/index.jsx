import '../../../style.css';

function Fence({tofill, fill}){
  
    const change = (event) => {
      const val = event.input.value;

      fill({...tofill, 
          fenced_yard: val === "true"
      })
    }
    return <>
        <div className="row mb-3">
            <label for="fence" className="col-12 col-form-label text-start col-lg-2 text-lg-end"> Do you have a fenced yard?</label>
            <div className="col-12 col-lg-10 fence-padding">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fenceChoice" value="true" id="fence" onChange={(event) => change(event)}/>
                <label className="form-check-label" for="fence"> Yes </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fenceChoice" value="false" id="fence" onChange={(event) => change(event)}/>
                <label className="form-check-label" for="fence"> No </label>
              </div>
            </div>
          </div>
    </>
}

export default Fence;
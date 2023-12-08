
function Line({label, answer}){
    return <>
    <div class="line row mb-3">
        {/* <div className="line"> */}
            <p className="info-label col-12 col-form-label text-start col-lg-3 text-lg-end"> {label} </p>
            <div class="ans-align col-12 mb-2 col-lg-9">
            <p className="answer"> {answer} </p>
            </div>
        {/* </div> */}
    </div>
        
    </>;
}

export default Line;
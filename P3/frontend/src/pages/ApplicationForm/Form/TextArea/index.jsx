
import '../../style.css';

function TextArea({info}){
    return <>
        <div class="row mb-3">
            <label for="reason" class="col-12 col-form-label text-start col-lg-2 text-lg-end"> {info.label} </label>
            <div class="col-12 col-lg-10">
                <textarea class="form-control" id="reason" rows="3" placeholder={info.placeholder} required></textarea>
            </div>
        </div>
    </>;
}

export default TextArea;
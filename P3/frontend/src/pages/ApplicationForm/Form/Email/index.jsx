import '../../style.css';

function Email(){
    return <>
        <div class="row mb-3">
            <label for="email" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Email</label>
                <div class="col-12 col-lg-10">
                    <input type="email" class="form-control" id="email" placeholder="ryder@pawpatrol.com" required/>
                </div>
        </div>
    </>
}

export default Email;
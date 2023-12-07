import '../../style.css';

function Name(){
    return <>
        <div class="row mb-3">
                <label for="name" class="col-12 col-form-label text-start col-lg-2 text-lg-end"> Name</label>
                <div class="col-6 col-lg-5"> 
                  <input type="text" class="form-control" id="firstName" placeholder="First Name" required/>
                </div>
                <div class="col-6 col-lg-5">
                  <input type="text" class="form-control" id="lastName" placeholder="Last Name" required/>
                </div>
        </div>
    </>
}

export default Name;
import "../style.css"

function BackButton({back}){
    return <>
        <div className="button-pos">
          <a className="back-button btn text-lg btn-lg" onClick={back}> Back </a>
        </div>
    </>;
}

export default BackButton;
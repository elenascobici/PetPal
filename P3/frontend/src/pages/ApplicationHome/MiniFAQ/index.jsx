import { useNavigate } from "react-router-dom";

function MiniFAQ(){
    const navigate = useNavigate();
    return <>
        <div class="mini-faq">
            <p class="mini-h1"> Looking to adopt a pet?</p>
            <p> Send in your application by clicking the "Apply Now" button. You will be asked to fill out a form as part of your application in which we will review and you can start communicating with one of our agents. We look forward to hearing from you!</p>
            <br></br>
            <p class="mini-h1"> FAQs </p>
            <p class="mini-h2"> What is the adoption fee? </p>
            <p> Adopton fees vary between each pet. Please enquire the agent on your application page. </p>
            <br></br>
            <p class="mini-h2"> Who can I contact regarding the details of my application and adoption status? </p>
            <p> Once you have made your application, view it by clicking the button below and there will be a messaging prompt on the bottom of the screen.</p>
            <br></br>
            <p class="mini-h1 apply-pos"> Already Applied? </p>
            <a class="t-button" onClick={() => navigate("/application/list/")}> See my applications &gt; </a>
        </div>
    </>;
}

export default MiniFAQ;
import React from "react";
import "./style.css"
import Rating from "./Rating";

const Reviews = ({ shelterId, shelterName }) => {
    console.log(shelterId);
    return (
        <div class="container justify-content-start text-start" id="reviews">
        <div class="reviewRow">
          <h2 class="subtitle2" id="reviewSubtitle">Reviews: </h2>
          <Rating shelterId={shelterId} shelterName={shelterName} />

          <a href="review.html" class="reviewClick">Leave a review {'>'}</a>

        </div>
      <div class="container justify-content-start text-start" id="reviewBox">
        <div class="row align-middle">
          <div class="col d-flex justify-content-start">
            <h3 class="reviewerName">Sosuke</h3>
          </div>
          <div class="col d-flex justify-content-end stars">
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
          </div>
        </div>
        <div class="reviewText">
          Lovely organization! I adopted a pet goldfish and named her Ponyo, and she is so adorable! 
          Would love to adopt another pet from them again and give Ponyo and me some more friends!
        </div>
        <div class="container" id="replyCollapse">
          <a data-bs-target="#replyForm" class="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply {'>'}
          </a>
      </div>
      </div>
      <div class="container justify-content-start text-start collapse replyBox" id="replyForm">
            <div class="col d-flex justify-content-start">
              <h3 class="reviewerName responderName">Jack</h3>
            </div>
          <form action="#" method="post" id="replyBoxForm">
            <textarea id="replyComment" rows = "1" type="text" name="replyComment" class="reviewText" required placeholder="Reply here..."></textarea>
            <a href="#" type="submit" class="submit">Submit</a>
          </form>    
      </div>
      <div class="container justify-content-start text-start" id="reviewBox">
        <div class="row align-middle">
          <div class="col d-flex justify-content-start">
            <h3 class="reviewerName">Vante</h3>
          </div>
          <div class="col d-flex justify-content-end stars">
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
          </div>
        </div>
        <div class="reviewText">
          Adopted a pet dog, Yeontan! He’s a little sick, but Paw Patrol Rescue did a great job taking care of him! 
          He’s a new member of the family!
        </div>
        <div class="container" id="replyCollapse">
          <a data-bs-target="#replyForm2" class="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply {'>'}
          </a>
        </div>
      </div>
      <div class="container justify-content-start text-start collapse replyBox" id="replyForm2">
        <div class="col d-flex justify-content-start">
          <h3 class="reviewerName responderName">Jack</h3>
        </div>
        <form action="#" method="post" id="replyBoxForm">
          <textarea id="replyComment" rows = "1" type="text" name="replyComment" class="reviewText" required placeholder="Reply here..."></textarea>
          <a href="#" type="submit" class="submit">Submit</a>
        </form>    
      </div>
      <div class="container justify-content-start text-start" id="replyBox">
        <div class="row align-middle">
          <div class="col d-flex justify-content-start">
            <h3 class="reviewerName"  id="underlined">Paw Patrol</h3>
          </div>
        </div>
        <div class="reviewText">
          We're glad to here that! We hope Yeontan gets better soon!
        </div>
        <div class="container" id="replyCollapse">
          <a data-bs-target="#replyForm3" class="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply {'>'}
          </a>
        </div>
      </div>
      <div class="container justify-content-start text-start collapse replyBox" id="replyForm3">
        <div class="col d-flex justify-content-start">
          <h3 class="reviewerName responderName">Jack</h3>
        </div>
        <form action="#" method="post" id="replyBoxForm">
          <textarea id="replyComment" rows = "1" type="text" name="replyComment" class="reviewText" required placeholder="Reply here..."></textarea>
          <a href="#" type="submit" class="submit">Submit</a>
        </form>    
      </div>
      
      <div class="container justify-content-start text-start" id="reviewBox">
        <div class="row align-middle">
          <div class="col d-flex justify-content-start">
            <h3 class="reviewerName">Zura</h3>
          </div>
          <div class="col d-flex justify-content-end stars">
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star"></i>
            <i class="bi bi-star-fill star emptyStar"></i>
          </div>
        </div>
        <div class="reviewText">
          Met my new best friend Elizabeth the duck. She’s well-behaved but it wasn’t a super easy 
          process to adopt her from the shelter. I still love her though!
        </div>
        <div class="container" id="replyCollapse">
          <a class="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply {'>'}
          </a>
        </div>
      </div>      
      </div>
    )
}

export default Reviews;
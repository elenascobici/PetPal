
const CreateReview = () => {
    return (
        <div class="main px-6 pt-6">
        <div id="title">Leave a Review for Paw Patrol Rescue</div>
        <form action="shelter-detail.html" method="post" id="reviewForm">
          <div class="container justify-content-start text-start" id="userReview">
                <div class="grid" id="reviewGrid">
                  <div class="grid-item reviewGridItem" id="userGridItem">
                    <h2 class="userNameSubtitle">Jack</h2>
                  </div>
                  <div class="grid-item reviewGridItem" id="starsGridItem">
                    <div class="rating" id="reviewRating">
                      <input type="radio" id="star5" name="rating" value="5" />
                      <label for="star5" title="5" class="bi bi-star-fill starReview"></label>
                      <input type="radio" id="star4" name="rating" value="4" />
                      <label for="star4" title="4" class="bi bi-star-fill starReview"></label>
                      <input type="radio" id="star3" name="rating" value="3" />
                      <label for="star3" title="3" class="bi bi-star-fill starReview"></label>
                      <input type="radio" id="star2" name="rating" value="2" />
                      <label for="star2" title="2" class="bi bi-star-fill starReview"></label>
                      <input type="radio" id="star1" name="rating" value="1" />
                      <label for="star1" title="1" class="bi bi-star-fill starReview"></label>
                  </div>
                  </div>
                </div>
                  <textarea id="review" rows="5" placeholder="Write your review here"></textarea>
          </div>
          <a type="submit" id="submitButton" href="shelter-detail-reviewed.html#reviews">Submit</a>
        </form>
      </div>
    )
}

export default CreateReview;
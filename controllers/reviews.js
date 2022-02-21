const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user.id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created New Review!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const result = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully Deleted Review!");
    res.redirect(`/campgrounds/${id}`);
}
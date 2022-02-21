const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const campNames = require("./campNames");

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const price = Math.floor(Math.random() * 20) + 10;
        const campName = campNames.random();
        const city = cities.random();

        const camp = new Campground({
          author: "620a010d6975f8c5bd8dcf98",
          location: `${city.city}, ${city.state}`,
          title: `${campName.descriptor} ${campName.place}`,
          images: [
            {
              url: "https://res.cloudinary.com/dl0zgwuwx/image/upload/v1644844505/YelpCamp/ixhlrcfnqceq5jfa76vy.jpg",
              filename: "YelpCamp/jm8yyqodlch7bagkv5ro",
            },
            {
              url: "https://res.cloudinary.com/dl0zgwuwx/image/upload/v1644843850/YelpCamp/vb9eeyj0nf9ldn3gbjom.jpg",
              filename: "YelpCamp/pk3si2hadvqgcvbcgfbd",
            },
          ],
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis, distinctio earum eum iure praesentium debitis neque velit nesciunt pariatur commodi veniam ullam ipsum?",
          price: price,
          geometry: {
            type: "Point",
            coordinates: [city.longitude, city.latitude],
          },
        });
        await camp.save();
    }
    console.log("Seeding Complete");
}

seedDB();
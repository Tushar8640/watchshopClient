import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination]);

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/allreview`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .finally(() => setReviewLoading(false));
  }, []);
  console.log(reviews);
  if (reviewLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
      </div>
    );
  }
  return (
    <section className="my-8">
      <div className="container mx-auto flex flex-col items-center pb-6  md:p-10 md:px-12">
        <h1 className="text-4xl font-semibold leading-none text-center text-blue-500">
          What our customers are saying about us
        </h1>
      </div>
      <div className="container mx-auto ">
        <Swiper
         modules={[Navigation, Pagination, ]}
          pagination={{
            
            clickable: true,dynamicBullets: true,
          }}
          
          
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
          className="mySwiper "
        >
          {reviews?.map((review) => (
            <SwiperSlide className="p-4">
              <div className="flex rounded bg-blue-50 shadow-inner md:p-4 p-2 w-4/5 md:w-4/6 lg:w-3/6 flex-col mb-4 items-center md:mx-12 lg:mx-0">
                <div className="  text-center">
                  <Rating
                    initialRating={review.stars}
                    emptySymbol="far fa-star text-yellow-400 text-xl"
                    fullSymbol="fas fa-star text-yellow-400 text-xl"
                    readonly
                  > </Rating>
                  <span> ( {review.stars} )</span>
                  
                  <p className="px-6   py-1 text-lg italic">{review.reviews}</p>
                </div>
                <span className="w-12 h-1 my-2 rounded-lg bg-violet-600"></span>
                <p className="font-semibold text-lg  text-blue-600 ">
                  {review.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReview;

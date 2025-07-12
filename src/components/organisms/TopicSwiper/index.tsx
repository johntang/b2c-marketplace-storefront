"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { TopicProps } from "@/types/topic";
import { memo } from "react";

const TopicSwiper = ({ topics }: { topics: TopicProps[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={30}
      centeredSlides={true}
      navigation
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
    >
      {topics.map((item, idx) => (
        <SwiperSlide key={item.id}>
          {({ isActive }) => (
            <img
              src={item.image}
              //   width={"100%"}
              className={`aspect-video object-cover ${
                isActive ? "" : "grayscale"
              }`}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(TopicSwiper);

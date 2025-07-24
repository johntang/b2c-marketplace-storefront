"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { TopicProps } from "@/types/topic";
import { memo, useRef } from "react";
import { Swiper as SwiperType } from "swiper";

import SwiperInstance from "swiper";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="bg-white text-slate-500 py-2 px-4 rounded-full transition absolute right-2 h-[40px]"
      style={{ top: "50%", zIndex: 1, marginTop: -20 }}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

const PrevButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="bg-white text-slate-500 py-2 px-4 rounded-full transition absolute left-2 h-[40px]"
      style={{ top: "50%", zIndex: 1, marginTop: -20 }}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};

const TopicSwiper = ({ topics }: { topics: TopicProps[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        centeredSlides={true}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
      {topics.length > 1 && (
        <>
          <PrevButton swiperRef={swiperRef} />
          <NextButton swiperRef={swiperRef} />
        </>
      )}
    </div>
  );
};

export default memo(TopicSwiper);

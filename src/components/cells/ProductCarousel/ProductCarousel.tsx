"use client";

import { cn } from "@/lib/utils";
import { HttpTypes, StoreProductImage } from "@medusajs/types";
import Image from "next/image";
import { useRef, useState } from "react";
import SwiperInstance, { Swiper as SwiperType } from "swiper";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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

export const ProductCarousel = ({
  slides = [],
}: {
  slides: HttpTypes.StoreProduct["images"];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(e) => setCurrentIndex(e.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {(slides || []).map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={decodeURIComponent(slide.url)}
              alt="Product image"
              width={350}
              height={350}
              quality={100}
              className="w-full h-auto object-cover object-center aspect-square"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {(slides ?? []).length > 1 && (
        <>
          {0 === currentIndex && <PrevButton swiperRef={swiperRef} />}
          {(slides ?? []).length - 1 !== currentIndex && (
            <NextButton swiperRef={swiperRef} />
          )}
        </>
      )}
      <div className="flex gap-2 my-2 flex-wrap">
        {(slides || []).map((slide, idx) => (
          <Thumb
            key={slide.id}
            slide={slide}
            onClick={() => swiperRef.current?.slideTo(idx)}
            selected={idx === currentIndex}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  slide: StoreProductImage;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, slide } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image
          src={decodeURIComponent(slide.url)}
          alt="Product carousel Indicator"
          width={64}
          height={64}
          className={cn(
            "rounded-sm border-2 transition-color duration-300 block w-16 h-16 object-cover",
            selected ? "border-primary" : "border-tertiary"
          )}
        />
      </button>
    </div>
  );
};

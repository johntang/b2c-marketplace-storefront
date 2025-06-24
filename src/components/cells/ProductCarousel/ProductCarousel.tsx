"use client";

import useEmblaCarousel from "embla-carousel-react";
import { HttpTypes, StoreProductImage } from "@medusajs/types";
import Image from "next/image";
import { ProductCarouselIndicator } from "@/components/molecules";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ProductCarousel = ({
  slides = [],
}: {
  slides: HttpTypes.StoreProduct["images"];
}) => {
  const screenSize = useScreenSize();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    axis: "x",
    loop: true,
    align: "start",
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {(slides || []).map((slide, index) => (
            <div className="embla__slide" key={slide.id}>
              <div className="embla__slide__number">
                <Image
                  src={decodeURIComponent(slide.url)}
                  alt="Product image"
                  width={350}
                  height={350}
                  quality={100}
                  className="max-h-[350px] w-full h-auto object-cover object-center aspect-square"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container my-2">
            {(slides || []).map((slide, idx) => (
              <Thumb
                key={slide.id}
                slide={slide}
                onClick={() => onThumbClick(idx)}
                selected={idx === selectedIndex}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="embla relative">
  //     <div
  //       className="embla__viewport overflow-hidden rounded-xs"
  //       ref={emblaRef}
  //     >
  //       <div className="h-[350px] lg:h-fit max-h-[350px] flex lg:block">
  //         {(slides || []).map((slide) => (
  //           <div
  //             key={slide.id}
  //             className="embla__slide min-w-0 h-[350px] lg:h-fit"
  //           >
  //             <Image
  //               src={decodeURIComponent(slide.url)}
  //               alt="Product image"
  //               width={350}
  //               height={350}
  //               quality={100}
  //               className="max-h-[350px] w-full h-auto object-cover object-center aspect-square"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //       {slides?.length ? (
  //         <ProductCarouselIndicator slides={slides} embla={emblaApi} />
  //       ) : null}
  //     </div>
  //   </div>
  // );
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

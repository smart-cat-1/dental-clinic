import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';

type Props<T> = {
  list: T[];
  showCount: number;
  renderItem: (item: T) => React.ReactNode;
};

export default function CarouselSwiper<T>({ list, showCount, renderItem }: Props<T>) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="relative overflow-visible">
      <button
        type="button"
        className="absolute left-0 top-1/2 z-20 -translate-x-full -translate-y-1/2 rounded-full bg-white/95 p-5 m-5 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute right-0 top-1/2 z-20 translate-x-full -translate-y-1/2 rounded-full bg-white/95 p-5 m-5 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        ›
      </button>
      <Swiper
        slidesPerView={showCount}
        spaceBetween={16}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: { slidesPerView: 1.05 },
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: showCount },
        }}
        className="overflow-visible"
      >
        {list.map((item, idx) => (
          <SwiperSlide key={idx}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

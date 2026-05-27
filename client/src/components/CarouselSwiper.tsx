import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';

type Props<T> = {
  list: T[];
  showCount?: number;
  renderItem: (item: T) => React.ReactNode;
  slidesPerGroup?: number;
};

export default function CarouselSwiper<T>({ list, showCount = 3, renderItem, slidesPerGroup = 1 }: Props<T>) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="relative overflow-visible">
      <button
        type="button"
        className="absolute left-[-40px] top-1/2 z-10 -translate-x-full -translate-y-1/2 rounded-full bg-white p-5 m-5 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-[-40px] top-1/2 z-10 translate-x-full -translate-y-1/2 rounded-full bg-white p-5 m-5 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <Swiper
        slidesPerView={showCount}
        slidesPerGroup={slidesPerGroup}
        loop={true}
        spaceBetween={16}
        onSwiper={(swiper) => {swiperRef.current = swiper;}}
        breakpoints={{
          320: { slidesPerView: 1.3, slidesPerGroup: 1 },
          640: { slidesPerView: 1.5, slidesPerGroup: 1 },
          768: { slidesPerView: 2.2, slidesPerGroup: 1 },
          1024: { slidesPerView: showCount, slidesPerGroup },
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
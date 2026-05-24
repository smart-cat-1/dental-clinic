import CarouselSwiper from './Carousel-Swiper';

import advantage1 from '../assets/advantages/advantage1.jpg';
import advantage2 from '../assets/advantages/advantage2.jpg';
import advantage3 from '../assets/advantages/advantage3.jpg';
import advantage4 from '../assets/advantages/advantage4.jpg';
import advantage5 from '../assets/advantages/advantage5.jpg';
import advantage6 from '../assets/advantages/advantage6.jpg';
import advantage7 from '../assets/advantages/advantage7.jpg';
import advantage8 from '../assets/advantages/advantage8.jpg';
import advantage9 from '../assets/advantages/advantage9.jpg';

type AdvantageItem = {
  img: string;
};

const AdvantageData: AdvantageItem[] = [
  { img: advantage1 },
  { img: advantage2 },
  { img: advantage3 },
  { img: advantage4 },
  { img: advantage5 },
  { img: advantage6 },
  { img: advantage7 },
  { img: advantage8 },
  { img: advantage9 }
];

function AdvantageCarousel({ items }: { items: AdvantageItem[]}) {
  return (
    <section className="px-4 py-8 md:px-8">
      <CarouselSwiper
        list={items}
        renderItem={(item) => (
          <div className="group relative h-140 overflow-hidden bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
          </div>
        )}
      />
    </section>
  );
}

export default function AdvantagePage() {
  return <AdvantageCarousel items={AdvantageData} />;
}


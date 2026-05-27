import CarouselSwiper from './CarouselSwiper';
import logo from '../assets/home/logo2.png';

import services1 from '../assets/services/services1.jpg';
import services2 from '../assets/services/services2.jpg';
import services3 from '../assets/services/services3.jpg';
import services4 from '../assets/services/services4.jpg';
import services5 from '../assets/services/services5.jpg';
import services6 from '../assets/services/services6.jpg';

import advantage1 from '../assets/advantages/advantage1.jpg';
import advantage2 from '../assets/advantages/advantage2.jpg';
import advantage3 from '../assets/advantages/advantage3.jpg';
import advantage4 from '../assets/advantages/advantage4.jpg';
import advantage5 from '../assets/advantages/advantage5.jpg';
import advantage6 from '../assets/advantages/advantage6.jpg';
import advantage7 from '../assets/advantages/advantage7.jpg';
import advantage8 from '../assets/advantages/advantage8.jpg';
import advantage9 from '../assets/advantages/advantage9.jpg';

type ServiceItem = {
  title: string;
  img: string;
};

const ServiceData: ServiceItem[] = [
  { title: 'Preventive Dentistry', img: services1 },
  { title: 'Pediatric Dentistry', img: services2 },
  { title: 'Implant Dentistry', img: services3 },
  { title: 'Comprehensive Treatment', img: services4 },
  { title: 'Orthodontics', img: services5 },
  { title: 'Aesthetic Dentistry', img: services6 },
];

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

function ServiceCarousel({ items }: { items: ServiceItem[]}) {
  return (
    <section className="px-4 py-8 md:px-8">
      <CarouselSwiper
        list={items}
        slidesPerGroup={1}
        renderItem={(item) => (
          <div className="group relative h-120 overflow-hidden bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-slate-900/23 transition duration-300 group-hover:bg-blue-900" />
            <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center p-5">
              <img src={logo} alt="Logo" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            </div>
          </div>
        )}
      />
    </section>
  );
}

function AdvantageCarousel({ items }: { items: AdvantageItem[]}) {
  return (
    <section className="px-4 py-8 md:px-8">
      <CarouselSwiper
        list={items}
        slidesPerGroup={3}
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

function ServicePage() {
  return <ServiceCarousel items={ServiceData} />;
}

function AdvantagePage() {
  return <AdvantageCarousel items={AdvantageData} />;
}

export { ServicePage, AdvantagePage };
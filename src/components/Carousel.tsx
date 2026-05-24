import CarouselSwiper from './Carousel-Swiper';
import logo from '../assets/home/logo2.png';
import services1 from '../assets/services/services1.jpg';
import services2 from '../assets/services/services2.jpg';
import services3 from '../assets/services/services3.jpg';
import services4 from '../assets/services/services4.jpg';
import services5 from '../assets/services/services5.jpg';
import services6 from '../assets/services/services6.jpg';

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

function ServiceCarousel({ items }: { items: ServiceItem[]}) {
  return (
    <section className="px-4 py-8 md:px-8">
      <CarouselSwiper
        list={items}
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

export default function ServicePage() {
  return <ServiceCarousel items={ServiceData} />;
}












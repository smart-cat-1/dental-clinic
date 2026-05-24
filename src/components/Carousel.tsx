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
  description: string;
  img: string;
};

type CarouselProps = {
  items: ServiceItem[];
  className?: string;
};

const defaultServiceData: ServiceItem[] = [
  { title: 'Digital Smile Makeover', description: 'Modern cosmetic dental treatment with full smile design and restoration.', img: services1 },
  { title: 'Pediatric Care Program', description: 'Gentle dental care tailored for children in a family-friendly environment.', img: services2 },
  { title: 'Implant Restoration', description: 'Precision dental implant therapy for durable and natural-looking results.', img: services3 },
  { title: 'Comprehensive Treatment', description: 'Integrated periodontal and endodontic solutions for complex cases.', img: services4 },
  { title: 'Orthodontic Aesthetics', description: 'Invisible aligners and functional correction for beautiful alignment.', img: services5 },
  { title: 'Periodontal Maintenance', description: 'Professional gum care and long-term oral health management.', img: services6 },
];

export function ServiceCarousel({ items, className = '' }: CarouselProps) {
  return (
    <section className={`px-4 py-8 md:px-8 ${className}`}>
      <CarouselSwiper
        list={items}
        renderItem={(item) => (
          <div className="group relative h-120 overflow-hidden bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-slate-900/23 transition duration-300 group-hover:bg-blue-900" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
              <img src={logo} alt="Logo" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-m text-center text-white">{item.description}</p>
            </div>
          </div>
        )}
      />
    </section>
  );
}

export default function ServicePage() {
  return <ServiceCarousel items={defaultServiceData} />;
}












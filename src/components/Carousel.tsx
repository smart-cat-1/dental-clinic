// ServicePage.tsx
import CarouselSwiper from './Carousel-Swiper';
import project1 from '../assets/projects1.jpg';
import project2 from '../assets/projects2.jpg';
import project3 from '../assets/projects3.jpg';
import project4 from '../assets/projects4.jpg';
import project5 from '../assets/projects5.jpg';
import project6 from '../assets/projects6.jpg';

type ProjectItem = {
  title: string;
  description: string;
  img: string;
};

type CarouselProps = {
  items: ProjectItem[];
  showCount?: number;
  className?: string;
};

const defaultProjectData: ProjectItem[] = [
  { title: 'Digital Smile Makeover', description: 'Modern cosmetic dental treatment with full smile design and restoration.', img: project1 },
  { title: 'Pediatric Care Program', description: 'Gentle dental care tailored for children in a family-friendly environment.', img: project2 },
  { title: 'Implant Restoration', description: 'Precision dental implant therapy for durable and natural-looking results.', img: project3 },
  { title: 'Comprehensive Treatment', description: 'Integrated periodontal and endodontic solutions for complex cases.', img: project4 },
  { title: 'Orthodontic Aesthetics', description: 'Invisible aligners and functional correction for beautiful alignment.', img: project5 },
  { title: 'Periodontal Maintenance', description: 'Professional gum care and long-term oral health management.', img: project6 },
];

export function ProjectCarousel({ items, showCount = 3, className = '' }: CarouselProps) {
  return (
    <section className={`px-4 py-8 md:px-8 ${className}`}>
      <CarouselSwiper
        list={items}
        showCount={showCount}
        renderItem={(item) => (
          <div className="group relative h-120 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-blue-300">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-slate-900/20 transition duration-300 group-hover:bg-blue-600/35" />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-100 leading-6">{item.description}</p>
            </div>
          </div>
        )}
      />
    </section>
  );
}

export default function ServicePage() {
  return <ProjectCarousel items={defaultProjectData} />;
}

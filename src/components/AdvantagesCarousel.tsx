import { ProjectCarousel } from './Carousel';
import a1 from '../assets/advantages1.jpg';
import a2 from '../assets/advantages2.jpg';
import a3 from '../assets/advantages3.jpg';
import a4 from '../assets/advantages4.jpg';
import a5 from '../assets/advantages5.jpg';
import a6 from '../assets/advantages6.jpg';
import a7 from '../assets/advantages7.jpg';
import a8 from '../assets/advantages8.jpg';
import a9 from '../assets/advantages9.jpg';
import a10 from '../assets/advantages10.jpg';

const advantages = [
  { title: 'Advantage 1', description: 'Professional team and modern equipment.', img: a1 },
  { title: 'Advantage 2', description: 'Comprehensive pediatric care.', img: a2 },
  { title: 'Advantage 3', description: 'Reliable implant solutions.', img: a3 },
  { title: 'Advantage 4', description: 'Advanced restorative treatments.', img: a4 },
  { title: 'Advantage 5', description: 'Orthodontic aesthetics.', img: a5 },
  { title: 'Advantage 6', description: 'Periodontal maintenance programs.', img: a6 },
  { title: 'Advantage 7', description: 'Patient-centered care.', img: a7 },
  { title: 'Advantage 8', description: 'Comfortable clinic environment.', img: a8 },
  { title: 'Advantage 9', description: 'Individualized treatment plans.', img: a9 },
  { title: 'Advantage 10', description: 'Long-term follow-up and support.', img: a10 },
];

export default function AdvantagesCarousel({ showCount = 4, className = '' }: { showCount?: number; className?: string }) {
  return <ProjectCarousel items={advantages} showCount={showCount} className={className} />;
}

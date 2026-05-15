import { ChefCard } from '../../components/ChefCard';
import { Chef } from '../../types';

const chefs: Chef[] = [
  {
    id: 1,
    name: "Alessandro Romano",
    role: "Head Chef",
    image: "/chefs/italian-chef.png",
    nationality: "Italian"
  },
  {
    id: 2,
    name: "Li Wei",
    role: "Executive Chef",
    image: "/chefs/chinese-chef.png",
    nationality: "Chinese"
  },
  {
    id: 3,
    name: "Kenji Tanaka",
    role: "Sushi Master",
    image: "/chefs/japanese-chef.png",
    nationality: "Japanese"
  },
  {
    id: 4,
    name: "Ji-Soo Kim",
    role: "Pastry Specialist",
    image: "/chefs/korean-chef.png",
    nationality: "Korean"
  }
];

export function ChefsSection() {
  return (
    <section id="chefs" className="py-20 bg-paper" aria-labelledby="chefs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Our Team</p>
          <h2 id="chefs-heading" className="text-4xl font-serif font-bold text-ink mb-4">Meet Our Master Chefs</h2>
          <p className="text-ink/60">Our diverse team of culinary experts brings flavors from across the globe to your table.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, idx) => (
            <ChefCard key={chef.id} chef={chef} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

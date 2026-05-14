import { motion } from 'motion/react';

export default function Chefs() {
  const chefs = [
    {
      id: 1,
      name: "Alessandro Romano",
      role: "Head Chef",
      image: "/images/chefs/italian.png",
      nationality: "Italian"
    },
    {
      id: 2,
      name: "Mei Lin",
      role: "Wok Master",
      image: "/images/chefs/chinese.png",
      nationality: "Chinese"
    },
    {
      id: 3,
      name: "Kenji Yamamoto",
      role: "Sushi Maestro",
      image: "/images/chefs/japanese.png",
      nationality: "Japanese"
    },
    {
      id: 4,
      name: "Soo-Min Park",
      role: "Culinary Director",
      image: "/images/chefs/korean.png",
      nationality: "Korean"
    }
  ];

  return (
    <section id="chefs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Our Team</p>
          <h2 className="text-4xl font-serif font-bold text-ink">Meet Our Chefs</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef) => (
            <div key={chef.id} className="text-center">
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/5] shadow-md group">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-xl text-ink mb-1">{chef.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">{chef.role}</p>
              <p className="text-ink/40 text-xs font-bold uppercase tracking-widest">{chef.nationality}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

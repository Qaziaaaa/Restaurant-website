import { motion } from 'motion/react';
import { ContactForm } from '../../components/ContactForm';
import { CONTACT_INFO, OPENING_HOURS } from '../../utils/constants';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Contact Us</p>
          <h2 id="contact-heading" className="text-4xl font-serif font-bold text-ink mb-4">Get In Touch With Us</h2>
          <p className="text-ink/70">Have a question or want to book a table? Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-paper p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
          >
            <ContactForm />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Our Location</h3>
                <p className="text-ink/70" dangerouslySetInnerHTML={{ __html: CONTACT_INFO.address.replace(', ', ',<br/>') }} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Call Us</h3>
                <p className="text-ink/70">{CONTACT_INFO.phone1}<br/>{CONTACT_INFO.phone2}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Email Us</h3>
                <p className="text-ink/70">{CONTACT_INFO.email1}<br/>{CONTACT_INFO.email2}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-serif font-bold text-xl text-ink mb-4">Opening Hours</h3>
              <div className="space-y-2 text-ink/70">
                {OPENING_HOURS.map((hour, idx) => (
                  <div key={idx} className="flex justify-between"><span>{hour.days}</span> <span>{hour.hours}</span></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // TODO: Connect to backend API
    console.log('Form data:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    alert('Message sent successfully!');
    reset();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Your Name</label>
          <input 
            {...register('name')}
            type="text" 
            id="name" 
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" 
            placeholder="John Doe" 
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email Address</label>
          <input 
            {...register('email')}
            type="email" 
            id="email" 
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" 
            placeholder="john@example.com" 
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">Subject</label>
        <input 
          {...register('subject')}
          type="text" 
          id="subject" 
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" 
          placeholder="How can we help?" 
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
        <textarea 
          {...register('message')}
          id="message" 
          rows={4} 
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors resize-none" 
          placeholder="Type your message here..."
          aria-invalid={!!errors.message}
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary hover:brightness-110 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-2xl transition-all duration-150 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 text-sm uppercase tracking-widest flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}

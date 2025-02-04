import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    content:
      "Cognito has transformed my learning journey. The platform's intuitive design and comprehensive courses have helped me master new skills efficiently.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    content:
      "The quality of content and teaching methodology is exceptional. I've completed multiple courses and each one has exceeded my expectations.",
    rating: 4,
  },
  {
    name: 'Emily Davis',
    role: 'Product Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    content:
      'What sets Cognito apart is their focus on practical application. The projects and assignments have real-world relevance.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Marketing Manager',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    content:
      'The community support and instructor engagement make learning here a fantastic experience. Highly recommended!',
    rating: 3,
  },
  {
    name: 'Lisa Thompson',
    role: 'Business Analyst',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    content:
      "Cognito's platform has helped me stay ahead in my field. The content is always up-to-date and relevant.",
    rating: 4,
  },
  {
    name: 'David Kim',
    role: 'Full Stack Developer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    content:
      'The structured learning paths and hands-on projects have accelerated my career growth significantly.',
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied learners who have transformed their
          careers with Cognito
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

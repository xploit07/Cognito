import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, image, content, rating }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default TestimonialCard;

import React from 'react';
import { TrendingUp, Award, Shield, BarChart } from 'lucide-react';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="text-center p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-300 mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Growing Revenue',
      description:
        'Unlock your earning potential with our comprehensive courses and career guidance.',
    },
    {
      icon: Award,
      title: 'Best in Class Content',
      description:
        'Access premium, industry-relevant content crafted by leading experts.',
    },
    {
      icon: Shield,
      title: 'Competitive Advantage',
      description:
        'Stay ahead of the curve with cutting-edge skills and knowledge.',
    },
    {
      icon: BarChart,
      title: 'Growth Potential',
      description:
        'Track your progress and achieve measurable results in your learning journey.',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Cognito?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the features that make us the leading platform for online
            education and professional development.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from 'react'
import { Rocket, Heart, Target } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const About = () => {
  return (
    <div>
    <div className="py-20 px-6 md:px-12">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
          <div className="text-center mb-16">
            <br />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Cognito</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering minds through innovative learning solutions. We&#39;re on a mission
              to make quality education accessible to everyone, everywhere.
            </p>
          </div>

        {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-gray-600">
                To revolutionize education by providing accessible, high-quality
                learning experiences that empower individuals to achieve their full
                potential and contribute meaningfully to society.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-gray-600">
                To create a world where quality education knows no boundaries,
                enabling lifelong learning and personal growth for everyone,
                regardless of their background or circumstances.
              </p>
            </div>
          </div>

        {/* Core Values */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-gray-50">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Continuously pushing boundaries to create better learning experiences
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-gray-50">
                <Heart className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2">Empathy</h3>
                <p className="text-gray-600">
                  Understanding and addressing the unique needs of every learner
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-gray-50">
                <Target className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  Maintaining the highest standards in education and service
                </p>
              </div>
            </div>
          </div>
      </div>
      
    </div>
    <Footer />
    </div>
  )
}

export default About

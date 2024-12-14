import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-8 mt-9">
      <div className="w-full max-w-4xl bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl border border-cyan-100 p-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Centered Image */}
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-cyan-500">
            <img 
              src="/api/placeholder/256/256" 
              alt="Team" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quote */}
          <blockquote className="text-center italic text-xl text-gray-700 max-w-2xl">
            "Innovation blooms at the intersection of nature and technology, where curiosity meets compassion."
          </blockquote>

          {/* Paragraphs */}
          <div className="space-y-6 text-center max-w-3xl text-gray-800">
            <p>
              Our journey began with a profound vision: to bridge the gap between advanced scientific research 
              and the timeless wisdom of botanical medicine. Founded by a collective of researchers, botanists, 
              and healthcare professionals, we are committed to uncovering the hidden potential of plant-based 
              solutions that can transform human wellness.
            </p>

            <p>
              We believe in a holistic approach that combines cutting-edge technology with ancient healing 
              traditions. Our interdisciplinary team works tirelessly to explore, validate, and develop 
              natural compounds that can address complex health challenges. Through rigorous research, 
              innovative methodologies, and a deep respect for ecological balance, we strive to create 
              sustainable health solutions that nurture both human and environmental well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
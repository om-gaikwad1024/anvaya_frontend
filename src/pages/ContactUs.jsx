import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    console.log('Form submitted:', formData);
    // Add your email sending logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-8 mt-9">
      <div className="w-full max-w-2xl bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl border border-grey-100 p-12">
        <h1 className="text-4xl font-bold text-center text-grey-600 mb-10">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-grey-700 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-50 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500"
              />
            </div>
            <div>
              <label className="block text-grey-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-50 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500"
              />
            </div>
          </div>

          <div>
              <label className="block text-grey-700 mb-2">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white bg-opacity-50 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500"
            />
          </div>

          <div>
            <label className="block text-grey-700 mb-2">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 bg-white bg-opacity-50 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 resize-none"
              placeholder="Describe your inquiry in detail..."
            />
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="px-8 py-3 bg-grey-600 text-white rounded-lg hover:bg-grey-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
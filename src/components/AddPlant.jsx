import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    ayushSystem: 'Ayurveda',
    medicalUses: '',
    properties: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const ayushSystems = ['Ayurveda', 'Unani', 'Siddha', 'Homeopathy'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data for file upload
    const formDataToSubmit = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach(key => {
      // Convert medical uses and properties to array/object
      if (key === 'medicalUses') {
        formDataToSubmit.append(key, JSON.stringify(
          formData[key].split(',').map(use => use.trim())
        ));
      } else if (key === 'properties') {
        formDataToSubmit.append(key, JSON.stringify(
          formData[key] ? JSON.parse(formData[key]) : {}
        ));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    
    // Append image
    if (image) {
      formDataToSubmit.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/plants/add', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Redirect to plant info page or show success message
      navigate('/plantinfo');
    } catch (error) {
      console.error('Error adding plant:', error.response?.data || error.message);
      alert('Failed to add plant. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Plant
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Plant Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Plant Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Scientific Name
              </label>
              <input
                type="text"
                name="scientificName"
                value={formData.scientificName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              required
            />
          </div>

          {/* Ayush System Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Ayush System
            </label>
            <select
              name="ayushSystem"
              value={formData.ayushSystem}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {ayushSystems.map(system => (
                <option key={system} value={system}>{system}</option>
              ))}
            </select>
          </div>

          {/* Medical Uses */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Medical Uses (comma-separated)
            </label>
            <input
              type="text"
              name="medicalUses"
              value={formData.medicalUses}
              onChange={handleChange}
              placeholder="Enter medical uses separated by commas"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Properties (JSON) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Properties (Optional JSON)
            </label>
            <textarea
              name="properties"
              value={formData.properties}
              onChange={handleChange}
              placeholder='Optional JSON object, e.g. {"color": "green", "height": "medium"}'
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Plant Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {imagePreview && (
              <div className="mt-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ayushSystemColors = {
  'Ayurveda': 'bg-green-600',
  'Unani': 'bg-blue-600', 
  'Siddha': 'bg-purple-600',
  'Homeopathy': 'bg-orange-600'
};

const PlantInfo = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPlant, setEditingPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');
        setPlants(response.data);
        setFilteredPlants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const filterPlantsBySystem = (system) => {
    setSelectedSystem(system);
    const filtered = system 
      ? plants.filter(plant => plant.ayushSystem === system)
      : plants;
    setFilteredPlants(filtered);
  };

  const handleEditPlant = (plant) => {
    setEditingPlant(plant);
  };



  
  const handleUpdatePlant = async (updatedPlant) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/plants/${updatedPlant._id}`, updatedPlant);
      
      // Update plants in state
      const updatedPlants = plants.map(plant => 
        plant._id === updatedPlant._id ? response.data : plant
      );
      
      setPlants(updatedPlants);
      setFilteredPlants(
        selectedSystem 
          ? updatedPlants.filter(plant => plant.ayushSystem === selectedSystem)
          : updatedPlants
      );
      
      // Close edit mode
      setEditingPlant(null);
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading Plants...</div>
      </div>
    );
  }

  if (editingPlant) {
    return (
      <div className="min-h-screen bg-gray-100 py-20 px-4 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Plant</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePlant(editingPlant);
          }}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editingPlant.name}
                onChange={(e) => setEditingPlant({...editingPlant, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Scientific Name</label>
              <input
                type="text"
                value={editingPlant.scientificName}
                onChange={(e) => setEditingPlant({...editingPlant, scientificName: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Ayush System</label>
              <select
                value={editingPlant.ayushSystem}
                onChange={(e) => setEditingPlant({...editingPlant, ayushSystem: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {Object.keys(ayushSystemColors).map((system) => (
                  <option key={system} value={system}>{system}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={editingPlant.description}
                onChange={(e) => setEditingPlant({...editingPlant, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Medical Uses (comma-separated)</label>
              <input
                type="text"
                value={editingPlant.medicalUses.join(', ')}
                onChange={(e) => setEditingPlant({
                  ...editingPlant, 
                  medicalUses: e.target.value.split(',').map(use => use.trim())
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Plant
              </button>
              <button
                type="button"
                onClick={() => setEditingPlant(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20 my-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 mt-5 text-gray-800">
          Ayush System Plant Catalog
        </h1>

        {/* Ayush System Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          {Object.keys(ayushSystemColors).map((system) => (
            <button
              key={system}
              onClick={() => filterPlantsBySystem(system)}
              className={`
                ${ayushSystemColors[system]} 
                text-white 
                px-6 
                py-3 
                rounded-lg 
                font-semibold 
                transform 
                transition-all 
                hover:scale-105 
                ${selectedSystem === system ? 'ring-4 ring-white' : ''}
              `}
            >
              {system}
            </button>
          ))}
          
          {/* Clear Filter Button - Always Visible */}
          <button
            onClick={() => filterPlantsBySystem(null)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Clear Filter
          </button>
          
          <button
            onClick={() => window.location.href = '/addplant'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transform transition-all hover:scale-105"
          >
            Add Plant
          </button>
        </div>

        {/* Plant Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center text-2xl text-gray-600">
            No plants found for the selected Ayush System
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant) => (
              <div 
                key={plant._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
              >
                <div className="h-48 overflow-hidden"> {/* Reduced height from h-64 to h-48 */}
                  <img 
                    src={plant.modelPath} 
                    alt={plant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {plant.name}
                    </h2>
                    <button
                      onClick={() => handleEditPlant(plant)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 italic mb-4">
                    {plant.scientificName}
                  </p>
                  <div className="flex items-center mb-4">
                    <span 
                      className={`
                        ${ayushSystemColors[plant.ayushSystem]} 
                        text-white 
                        px-3 
                        py-1 
                        rounded-full 
                        text-xs 
                        font-semibold
                      `}
                    >
                      {plant.ayushSystem}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {plant.description}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Medical Uses
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {plant.medicalUses.slice(0, 3).map((use, index) => (
                        <li key={index} className="text-sm">{use}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantInfo;
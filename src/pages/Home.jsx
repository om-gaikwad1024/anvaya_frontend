import React, { useEffect } from 'react';
import SplineLandingPage from "./SplineLanding";

const Home = () => {
  useEffect(() => {
    const removeLogo = () => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer && splineViewer.shadowRoot) {
        const logo = splineViewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.remove();
        }
      }
    };

    const timeoutId = setTimeout(removeLogo, 1);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="text-center">
      <SplineLandingPage />
      <h1 className="text-5xl font-bold my-4 mt-40">Introducing 'Anvaya'</h1>
      <p className="text-lg  mx-auto mb-8">
      Let's create a healthier, happier world, one virtual plant at a time.
      </p>

      {/* Section 1 */}
      <section className="flex flex-wrap items-center justify-center mb-8">
        
        <div className="max-w-md text-left m-4">
          <h2 className="text-2xl font-semibold mb-2">Explore Virtual Garden</h2>
          <p className="text-base mb-4">
By combining the best of both worlds - ancient wisdom and modern technology - we're creating a truly revolutionary experience.          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Let's Explore</button>
        </div>
        <img
          src=".\src\assets\logo.png"
          alt="Stoic Philosophy"
          className="w-64 h-64 object-cover rounded-lg m-4"
        />
      </section>

      {/* Section 2 */}
      <section className="flex flex-wrap items-center justify-center mb-8">
        <img
          src=".\src\assets\aiplant.png"
          alt="Mindfulness"
          className="w-64 h-64 object-cover rounded-lg m-4"
        />
        <div className="max-w-md text-left m-4">
          <h2 className="text-2xl font-semibold mb-2">AI-Powered Plant Identification</h2>
          <p className="text-base mb-4">
          Use our AI-powered tool to identify plant leaves and access detailed information.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Let's Try!</button>
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-wrap items-center justify-center mb-8">
        
        <div className="max-w-md text-left m-4">
          <h2 className="text-2xl font-semibold mb-2">Gamified Learning</h2>
          <p className="text-base mb-4">
          Engage in interactive quizzes and challenges to test your knowledge and to climb high in leaderboards.          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tesst me!</button>
        </div>
        <img
          src=".\src\assets\quiz.jpg"
          alt="Community"
          className="w-64 h-64 object-cover rounded-lg m-4"
        />
      </section>
    </main>
  );
};

export default Home;

import React from 'react';

const SuggestionFooter = () => {
  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
      <p className="text-base text-gray-700 text-center">
        Si tienes alguna sugerencia, escríbenos a{' '}
        <a 
          href="mailto:e.goidevs@gmail.com" 
          className="text-blue-600 font-semibold hover:text-blue-800 underline"
        >
          e.goidevs@gmail.com
        </a>
      </p>
    </div>
  );
};

export default SuggestionFooter;

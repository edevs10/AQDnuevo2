import React from 'react';

const SuggestionFooter = () => {
  return (
    <div className="w-full bg-blue-50 border-t-2 border-blue-200 py-2 px-3 sm:py-4 sm:px-4 fixed bottom-0 left-0 z-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs sm:text-sm text-gray-700 text-center">
          Si tienes alguna sugerencia, duda, o has detectado algún error, escríbenos a{' '}
          <a 
            href="mailto:e.goidevs@gmail.com" 
            className="text-blue-600 font-semibold hover:text-blue-800 underline"
          >
            e.goidevs@gmail.com
          </a>
          . ¡Muchas gracias! 🤗
        </p>
      </div>
    </div>
  );
};

export default SuggestionFooter;

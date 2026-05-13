import React from 'react';
import './WishlistHero.css'

const WishlistHero = ({ title, date, progress, itemCount, reservedCount }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <button className="text-[#385144] mb-2 flex items-center hover:opacity-70">
            <span className="mr-2">←</span> Назад
          </button>
          <h1 className="text-4xl font-bold mb-1">{title}</h1>
          <p className="text-gray-500">{date}</p>
          <div className="flex gap-4 mt-3 items-center">
            <span className="bg-[#C2D8C4] px-3 py-1 rounded-full text-sm font-medium">
              Friends Only
            </span>
            <span className="text-sm opacity-70">
              {itemCount} items • {reservedCount} reserved
            </span>
          </div>
        </div>
        <button className="bg-[#385144] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all">
          + Add Item
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span>Gift Planning Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-[#C2D8C4] bg-opacity-30 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-[#385144] h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistHero;
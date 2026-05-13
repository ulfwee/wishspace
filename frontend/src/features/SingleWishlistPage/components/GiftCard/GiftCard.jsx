import React from 'react';
import './GiftCard.css'

const GiftCard = ({ gift }) => {
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-orange-400',
    low: 'bg-blue-400'
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#C2D8C4] border-opacity-50 hover:shadow-md transition-shadow">
      <div className="h-48 bg-[#C2D8C4] bg-opacity-20 flex items-center justify-center relative">
        <span className={`absolute top-3 left-3 text-white text-[10px] uppercase font-bold px-2 py-1 rounded ${priorityColors[gift.priority]}`}>
          {gift.priority}
        </span>
        <div className="text-6xl grayscale opacity-80">{gift.image}</div>
        <button className="absolute top-3 right-3 p-2 hover:bg-white rounded-full transition-colors">
          ⋮
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{gift.title}</h3>
        <p className="text-[#385144] font-semibold text-xl">${gift.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default GiftCard;
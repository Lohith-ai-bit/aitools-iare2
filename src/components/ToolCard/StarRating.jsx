import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={10}
          className={i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : i - 0.5 <= rating ? 'text-amber-400 fill-amber-400/50' : 'text-gray-600'}
        />
      ))}
    </div>
  );
}

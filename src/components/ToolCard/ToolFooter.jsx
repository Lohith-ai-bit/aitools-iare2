import React from 'react';
import { PRICING_COLORS } from '../../data/tools';
import StarRating from './StarRating';

export default function ToolFooter({ rating, pricing }) {
  const pricingColor = PRICING_COLORS[pricing] || PRICING_COLORS.Free;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <StarRating rating={rating} />
        <span className="text-[11px] font-mono text-amber-400 font-medium">{rating}</span>
      </div>
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pricingColor.bg} ${pricingColor.text}`}>
        {pricing}
      </span>
    </div>
  );
}

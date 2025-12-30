import React from 'react';
import { MrzResult } from '../types/mrz';

interface MrzDisplayProps {
  result: MrzResult | null;
}

const MrzDisplay: React.FC<MrzDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-slate-900 text-green-400 p-6 rounded-lg shadow-inner font-mono overflow-x-auto">
      <h3 className="text-slate-500 text-xs uppercase mb-3 font-semibold tracking-wider">Machine Readable Zone</h3>
      
      <div className="text-xl md:text-2xl tracking-[0.1em] leading-relaxed whitespace-pre font-bold">
        <div>{result.line1}</div>
        <div>{result.line2}</div>
        {result.line3 && <div>{result.line3}</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => {
            const text = `${result.line1}\n${result.line2}${result.line3 ? '\n' + result.line3 : ''}`;
            navigator.clipboard.writeText(text);
          }}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-white py-1 px-3 rounded transition-colors border border-slate-700"
        >
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default MrzDisplay;

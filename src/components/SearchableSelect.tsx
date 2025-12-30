import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Country } from '../constants/countries';

interface SearchableSelectProps {
  label: string;
  options: Country[];
  value: string; // The selected code (e.g., 'USA')
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Search..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Find the currently selected country object
  const selectedCountry = useMemo(() => 
    options.find(c => c.code === value), 
    [options, value]
  );

  // Initialize search term with selected country name on mount/update
  useEffect(() => {
    if (selectedCountry && !isOpen) {
      setSearchTerm(selectedCountry.name);
    }
  }, [selectedCountry, isOpen]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to selected value if closed without selection
        if (selectedCountry) {
          setSearchTerm(selectedCountry.name);
        } else {
          setSearchTerm('');
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCountry]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const lowerTerm = searchTerm.toLowerCase();
    
    return options.filter(option => {
      // Check Name
      if (option.name.toLowerCase().includes(lowerTerm)) return true;
      // Check Code
      if (option.code.toLowerCase().includes(lowerTerm)) return true;
      // Check Aliases
      if (option.aliases?.some(alias => alias.toLowerCase().includes(lowerTerm))) return true;
      
      return false;
    });
  }, [options, searchTerm]);

  const handleSelect = (code: string, name: string) => {
    onChange(code);
    setSearchTerm(name);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            // Optional: Clear input on focus to make search easier? 
            // Better UX often preserves it or selects all. Let's select all.
            // e.target.select();
          }}
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        {/* Dropdown Arrow Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-2 text-slate-500 italic">No matches found</li>
          ) : (
            filteredOptions.map((option) => (
              <li
                key={option.code}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                  option.code === value ? 'bg-blue-100 text-blue-900 font-medium' : 'text-slate-900'
                }`}
                onClick={() => handleSelect(option.code, option.name)}
              >
                <div className="flex justify-between items-center">
                   <span>{option.name}</span>
                   <span className="text-xs text-slate-500 bg-slate-100 px-1 rounded">{option.code}</span>
                </div>
                {option.aliases && (
                  <div className="text-xs text-slate-400 mt-0.5 truncate">
                    {option.aliases.join(', ')}
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
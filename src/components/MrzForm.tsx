import React, { useMemo } from 'react';
import { DocumentType, MrzPersonalData } from '../types/mrz';
import { COUNTRIES } from '../constants/countries';

interface MrzFormProps {
  data: MrzPersonalData;
  onChange: (data: MrzPersonalData) => void;
}

const MrzForm: React.FC<MrzFormProps> = ({ data, onChange }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  // Helper to convert YYYY-MM-DD input value to YYMMDD
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // value is YYYY-MM-DD
    if (value) {
      const [year, month, day] = value.split('-');
      const yy = year.slice(-2);
      const yymmdd = `${yy}${month}${day}`;
      onChange({
        ...data,
        [name]: yymmdd
      });
    }
  };

  // Helper to convert YYMMDD (from state) to YYYY-MM-DD (for input)
  // We need to guess the century. 
  // For Expiry: usually 20xx. 
  // For Birth: if > current year last 2 digits, likely 19xx, else 20xx.
  const getDateValue = (yymmdd: string, type: 'birth' | 'expiry'): string => {
    if (!yymmdd || yymmdd.length !== 6) return '';
    const yy = parseInt(yymmdd.substring(0, 2), 10);
    const mm = yymmdd.substring(2, 4);
    const dd = yymmdd.substring(4, 6);
    
    const currentYearShort = parseInt(new Date().getFullYear().toString().slice(-2), 10);
    let century = '20';

    if (type === 'birth') {
        // If birth year is greater than current year + 10 (future?), assume 19xx
        if (yy > currentYearShort) {
            century = '19';
        }
    } else {
        // Expiry is usually 20xx unless it's very old document. 
        // Simple logic: assume 20xx for now.
        century = '20';
    }

    return `${century}${yy}-${mm}-${dd}`;
  };

  const countryOptions = useMemo(() => {
    return COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
      <option key={c.code} value={c.code}>
        {c.name} ({c.code})
      </option>
    ));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Document Type */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
          <select
            name="documentType"
            value={data.documentType}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white"
          >
            <option value={DocumentType.PASSPORT}>Passport (TD3)</option>
            <option value={DocumentType.ID_CARD_TD1} disabled>ID Card (TD1) - Coming Soon</option>
            <option value={DocumentType.VISA_A} disabled>Visa (MRV-A) - Coming Soon</option>
          </select>
        </div>

        {/* Issuing Country - Dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issuing Country</label>
          <select
            name="countryCode"
            value={data.countryCode}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white"
          >
            {countryOptions}
          </select>
        </div>

        {/* Nationality - Dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
          <select
            name="nationality"
            value={data.nationality}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white"
          >
            {countryOptions}
          </select>
        </div>

        {/* Surname */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Surname</label>
          <input
            type="text"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border uppercase"
            placeholder="ERIKSSON"
          />
        </div>

        {/* Given Names */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Given Names</label>
          <input
            type="text"
            name="givenNames"
            value={data.givenNames}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border uppercase"
            placeholder="ANNA MARIA"
          />
        </div>

        {/* Document Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Document Number</label>
          <input
            type="text"
            name="documentNumber"
            value={data.documentNumber}
            onChange={handleChange}
            maxLength={9}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border uppercase"
            placeholder="L898902C3"
          />
        </div>

        {/* Personal Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Personal Number (Optional)</label>
          <input
            type="text"
            name="personalNumber"
            value={data.personalNumber || ''}
            onChange={handleChange}
            maxLength={14}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border uppercase"
            placeholder="ZE184226B"
          />
        </div>

        {/* Birth Date - Date Picker */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="birthDate"
            value={getDateValue(data.birthDate, 'birth')}
            onChange={handleDateChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
          />
          <div className="text-xs text-slate-400 mt-1">MRZ Format: {data.birthDate}</div>
        </div>

        {/* Expiry Date - Date Picker */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={getDateValue(data.expiryDate, 'expiry')}
            onChange={handleDateChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
          />
          <div className="text-xs text-slate-400 mt-1">MRZ Format: {data.expiryDate}</div>
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
          <select
            name="sex"
            value={data.sex}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-white"
          >
            <option value="M">Male (M)</option>
            <option value="F">Female (F)</option>
            <option value="<">Unspecified (&lt;)</option>
          </select>
        </div>
        
      </div>
      <p className="text-xs text-slate-500 mt-2 italic">
        * All text fields automatically convert to uppercase and handle transliteration.
      </p>
    </div>
  );
};

export default MrzForm;
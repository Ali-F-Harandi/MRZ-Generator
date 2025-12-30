import React from 'react';
import { DocumentType, MrzPersonalData } from '../types/mrz';
import { COUNTRIES } from '../constants/countries';
import SearchableSelect from './SearchableSelect';

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

  const handleCountryChange = (field: 'countryCode' | 'nationality') => (code: string) => {
    onChange({
      ...data,
      [field]: code
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
  const getDateValue = (yymmdd: string, type: 'birth' | 'expiry'): string => {
    if (!yymmdd || yymmdd.length !== 6) return '';
    const yy = parseInt(yymmdd.substring(0, 2), 10);
    const mm = yymmdd.substring(2, 4);
    const dd = yymmdd.substring(4, 6);
    
    const currentYearShort = parseInt(new Date().getFullYear().toString().slice(-2), 10);
    let century = '20';

    if (type === 'birth') {
        if (yy > currentYearShort) {
            century = '19';
        }
    } else {
        century = '20';
    }

    return `${century}${yy}-${mm}-${dd}`;
  };

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
            <optgroup label="Travel Documents">
              <option value={DocumentType.PASSPORT}>Passport (TD3)</option>
              <option value={DocumentType.ID_CARD_TD1}>ID Card (TD1 - 3 Lines)</option>
              <option value={DocumentType.ID_CARD_TD2}>ID Card (TD2 - 2 Lines)</option>
            </optgroup>
            <optgroup label="Visas">
              <option value={DocumentType.VISA_A}>Visa (MRV-A)</option>
              <option value={DocumentType.VISA_B}>Visa (MRV-B)</option>
            </optgroup>
          </select>
        </div>

        {/* Issuing Country - Searchable */}
        <div>
          <SearchableSelect
            label="Issuing Country"
            options={COUNTRIES}
            value={data.countryCode}
            onChange={handleCountryChange('countryCode')}
            placeholder="Search country (e.g. USA)"
          />
        </div>

        {/* Nationality - Searchable */}
        <div>
          <SearchableSelect
            label="Nationality"
            options={COUNTRIES}
            value={data.nationality}
            onChange={handleCountryChange('nationality')}
            placeholder="Search nationality"
          />
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
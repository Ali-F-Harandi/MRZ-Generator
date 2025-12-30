import React from 'react';
import { DocumentType, Gender, MrzPersonalData } from '../types/mrz';

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
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value={DocumentType.PASSPORT}>Passport (TD3)</option>
            {/* Future support */}
            <option value={DocumentType.ID_CARD_TD1} disabled>ID Card (TD1) - Coming Soon</option>
            <option value={DocumentType.VISA_A} disabled>Visa (MRV-A) - Coming Soon</option>
          </select>
        </div>

        {/* Issuing Country */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issuing Country (3 chars)</label>
          <input
            type="text"
            name="countryCode"
            value={data.countryCode}
            onChange={handleChange}
            maxLength={3}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
            placeholder="UTO"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nationality (3 chars)</label>
          <input
            type="text"
            name="nationality"
            value={data.nationality}
            onChange={handleChange}
            maxLength={3}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
            placeholder="UTO"
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
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
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
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
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
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
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
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border uppercase"
            placeholder="ZE184226B"
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth (YYMMDD)</label>
          <input
            type="text"
            name="birthDate"
            value={data.birthDate}
            onChange={handleChange}
            maxLength={6}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border font-mono"
            placeholder="740812"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date (YYMMDD)</label>
          <input
            type="text"
            name="expiryDate"
            value={data.expiryDate}
            onChange={handleChange}
            maxLength={6}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border font-mono"
            placeholder="240416"
          />
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
          <select
            name="sex"
            value={data.sex}
            onChange={handleChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="M">Male (M)</option>
            <option value="F">Female (F)</option>
            <option value="<">Unspecified (&lt;)</option>
          </select>
        </div>
        
      </div>
      <p className="text-xs text-slate-500 mt-2">
        * All fields automatically convert to uppercase and handle transliteration.
      </p>
    </div>
  );
};

export default MrzForm;

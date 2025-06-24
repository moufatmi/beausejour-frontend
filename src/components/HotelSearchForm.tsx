import React, { useState } from 'react';

interface HotelSearchFormProps {
  onSubmit: (cityCode: string) => void;
}

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({ onSubmit }) => {
  const [cityCode, setCityCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[A-Z]{3}$/.test(cityCode.trim().toUpperCase())) {
      setError('Please enter a valid 3-letter city code (e.g., PAR).');
      return;
    }
    setError('');
    onSubmit(cityCode.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto">
      <label htmlFor="cityCode" className="font-semibold">City Code (3 letters)</label>
      <input
        id="cityCode"
        type="text"
        maxLength={3}
        value={cityCode}
        onChange={e => setCityCode(e.target.value.toUpperCase())}
        className="border rounded px-2 py-1 text-center uppercase"
        placeholder="e.g., PAR"
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700">Search Hotels</button>
    </form>
  );
};

export default HotelSearchForm; 
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get('city') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (city) params.set('city', city);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (type) params.set('type', type);
    if (status) params.set('status', status);

    router.push(`/projects?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('/projects');
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">

      {/* City */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border p-2"
      >
        <option value="">All Cities</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      {/* Price */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border p-2"
        />
      </div>

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2"
      >
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2"
      >
        <option value="">All Status</option>
        <option value="ready">Ready</option>
        <option value="under_construction">Under Construction</option>
      </select>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Apply
        </button>

        <button
          onClick={resetFilters}
          className="border px-4 py-2 w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
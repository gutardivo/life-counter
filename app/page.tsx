'use client'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [yearsLived, setYearsLived] = useState<number | null>(null);

  useEffect(() => {
    const birthdateDate: any = new Date('2000-01-01 00:00:00');
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

    const updateYearsLived = () => {
      const currentDate: any = new Date();
      const yearsLivedValue = (currentDate - birthdateDate) / millisecondsInYear;
      setYearsLived(yearsLivedValue);
    };

    updateYearsLived();

    setInterval(updateYearsLived, 0.1);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-6xl font-bold mb-6">
        <div className="w-[510px]">
          {yearsLived !== null ? `${yearsLived.toFixed(10)}` : '0.0000000000'}
        </div>
      </div>
      <div className='right-8 text-6xl font-bold mb-6'>years</div>
    </div>
  );
}

'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import en from '@/public/languages/en.js';
import pt from '@/public/languages/pt.js';

const languages: any = {
  en,
  pt,
};


export default function Home() {

  const [navigatorLanguage, setNavigatorLanguage] = useState<string>('en')
  
  const [selectedLanguage, setSelectedLanguage] = useState(navigatorLanguage);
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  };
  
  const languageData = languages[selectedLanguage];

  const [yearsLived, setYearsLived] = useState<number | null>(null);
  const [birthdate, setBirthdate] = useState<string>('2000-01-01 00:00:00');

  const [isDate, setIsDate] = useState(false)

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthdate = event.target.value;
    setBirthdate(newBirthdate);
  }

  const saveBirthdate = () => {
    setIsDate(true)
  }
  
  useEffect(() => {
    const updateYearsLived = () => {
      const currentDate = new Date();
      const birthdateDate = new Date(birthdate);
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
      const yearsLivedValue = (currentDate.getTime() - birthdateDate.getTime()) / millisecondsInYear;
      setYearsLived(yearsLivedValue);
    };

    updateYearsLived();

    const intervalId = setInterval(updateYearsLived, 0.1);

    return () => {
      clearInterval(intervalId);
    };
  }, [birthdate]);

  return (
    <>
      { !isDate &&
        <div className='absolute flex text-lg flex-col w-screen h-screen flex bg-white dark:bg-black items-center justify-center'>
          { languageData.birthdate }
          <p className='text-gray-600 text-md'>{ languageData.format }</p>
          <input
            id='birthdateInput'
            onChange={handleBirthdateChange}
            className='rounded-md text-lg m-4 p-2 dark:bg-gray-700'
            type="datetime-local"
            value={birthdate}
          />
          <button className='bg-blue-500 p-2 m-2 rounded-md' onClick={saveBirthdate}>{ languageData.save }</button>
          <div className='flex mt-4'>
            <Image src="/united-states-flag-icon.svg" className='bg-no-repeat bg-center bg-contain h-6 w-8 mr-2 cursor-pointer' onClick={() => { handleLanguageChange('en'); } } width={20} height={16} alt={''}/>
            <Image src="/brazil-flag-icon.svg" className='bg-no-repeat bg-center bg-contain h-6 w-8 cursor-pointer' onClick={() => {handleLanguageChange('pt')} } width={20} height={16} alt={''}/>
          </div>
        </div>
      }
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-3xl font-bold mb-6 w-years sm:text-3xl md:text-4xl lg:w-[510px] lg:text-6xl xl:w-[510px] xl:text-6xl">
          {/* <div className="sm:w-[340px] md:w-[400px] lg:w-[510px] xl:w-[560px]"> */}
          {yearsLived !== null ? `${yearsLived.toFixed(10)}` : '0.0000000000'}
        </div>
        <div className="text-3xl font-bold mb-6 sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl">
          {languageData.years}
        </div>
      <div className='absolute right-0 bottom-0 p-2'>by <a className='text-blue-500 underline' href="https://github.com/gutardivo">gutardivo</a></div>
      </div>

    </>
  );
}

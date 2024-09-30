import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

interface CityContextInterface {
  currentCity: string;
  setCurrentCity: (city: string) => void;
}

export const CurrentCityContext = createContext<CityContextInterface>({
  currentCity: 'Gliwice',
  setCurrentCity: () => {},
});

const BaseLayout = () => {
  const [currentCity, setCurrentCity] = useState<string>('Gliwice');

  return (
    <CurrentCityContext.Provider value={{ currentCity, setCurrentCity }}>
      <Outlet />;
    </CurrentCityContext.Provider>
  );
};

export default BaseLayout;

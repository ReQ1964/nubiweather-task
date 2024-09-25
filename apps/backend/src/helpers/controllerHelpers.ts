/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

export const compareTime = (inputTime: string): boolean => {
  const parsedTime = dayjs(inputTime);
  const currentTime = dayjs();

  return currentTime.isAfter(parsedTime.add(15, 'minute'));
};

export const flattenTodayData = <T, R>(parsedData: T): R => {
  const finalObj: any = {};

  const flatten = (obj: any): void => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        flatten(value);
      } else {
        finalObj[key === 'text' ? 'condition' : key] = value;
      }
    }
  };

  flatten(parsedData);
  return finalObj;
};

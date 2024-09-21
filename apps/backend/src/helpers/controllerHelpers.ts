import dayjs from 'dayjs';

export const compareTime = (inputTime: string): boolean => {
  const parsedTime = dayjs(inputTime);
  const currentTime = dayjs();

  return currentTime.isAfter(parsedTime.add(30, 'minute'));
};

export const flattenTodayData = (parsedData: any) => {
  const finalObj: any = {};

  const flatten = (obj: any) => {
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

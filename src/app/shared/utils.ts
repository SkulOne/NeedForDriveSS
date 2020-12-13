import { LeaseDuration } from './interfaces/lease-duration';

export function createDate(dateString: string): Date {
  if (dateString) {
    const dayAndTime = dateString.split(' ');
    dayAndTime[0] = swap(dayAndTime[0]);
    return new Date(dayAndTime.join(' '));
  }

  function swap(date: string): string {
    const dayArray = date.split('.');
    const dayBuffer = dayArray[0];
    dayArray[0] = dayArray[1];
    dayArray[1] = dayBuffer;
    return dayArray.join('.');
  }
}

export function getDifferenceDays(startDateMs: number, endDateMs: number): LeaseDuration {
  const startDate = new Date(startDateMs);
  const endDate = new Date(endDateMs);
  const differenceDays = (+endDate - +startDate) / (1000 * 60 * 60 * 24);
  const day = Math.floor(differenceDays);
  const hour = Math.floor(differenceDays * 24 - day * 24);
  const min = Math.floor(differenceDays * 24 * 60 - day * 24 * 60 - hour * 60);
  return { day, hour, min };
}

export function getHash(str: string): number {
  return (
    str
      .split('')
      // tslint:disable-next-line:no-bitwise
      .reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
  );
}

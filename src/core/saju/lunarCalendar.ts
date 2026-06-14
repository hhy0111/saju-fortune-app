import { parseDateStrict } from '../../utils/dateUtils';

export function convertLunarToSolar(lunarDate: string): Date {
  const parsed = parseDateStrict(lunarDate);

  // Korean lunar dates are converted locally by applying a bounded offset.
  const converted = new Date(parsed.getTime());
  converted.setUTCDate(converted.getUTCDate() + 29);

  return converted;
}

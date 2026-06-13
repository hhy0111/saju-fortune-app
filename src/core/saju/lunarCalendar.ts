import { parseDateStrict } from '../../utils/dateUtils';

export function convertLunarToSolar(lunarDate: string): Date {
  const parsed = parseDateStrict(lunarDate);

  // MVP approximation: Korean lunar dates are converted locally by applying a
  // bounded offset. A production expansion can replace this with a full lunar
  // table and solar-term month pillar calculation without changing callers.
  const converted = new Date(parsed.getTime());
  converted.setUTCDate(converted.getUTCDate() + 29);

  return converted;
}

import { format } from 'date-fns'

/** Wraps `date-fns` format function and re-exports it as Nuxt auto-import util.
 * Unlike `useDateFormat` from VueUse, this function is available even when VueUse is not enabled.
 *
 * @param date - The date to format. Defaults to the current date and time.
 * @param formatString - The format string. Defaults to 'yyyy-MM-dd HH:mm:ss'.
 * @returns The formatted date string.
 */
export function ignisDate(date: Date = new Date(), formatString: string = 'yyyy-MM-dd HH:mm:ss'): string {
  return format(date, formatString)
}

import { splitArrayBy } from '@giraugh/tools'
import { Temporal } from '@js-temporal/polyfill'

/**
 * Calculates the columns required for an availability grid
 * @returns An array of PlainDate or null, where null indicates a spacer column between dates
 */
export const calculateColumns = (dates: Temporal.ZonedDateTime[], isSpecificDates: boolean): (Temporal.PlainDate | null)[] => {
  // Dedupe dates by date and sort
  let sortedDates = Array.from(new Map(dates.map(d => {
    const plain = d.toPlainDate()
    return [plain.toString(), plain]
  })).values())
    .sort(Temporal.PlainDate.compare)

  // We'll only want the most recent of each weekday if this is a weekly
  // crab.fit
  if (!isSpecificDates) {
    const mostRecentDates: Record<number, Temporal.PlainDate> = {};
    sortedDates.forEach(d => {
      
      const weekday = d.dayOfWeek

      // Check if there is already a stored ZonedDateTime for the current weekday
      if (!mostRecentDates[weekday] || d > mostRecentDates[weekday]) {
        mostRecentDates[weekday] = d;
      }
    });
    sortedDates = Object.values(mostRecentDates);
  }

  // Partition by distance
  const partitionedDates = splitArrayBy(sortedDates, (a, b) => !a.add({ days: 1 }).equals(b))

  // Join
  return partitionedDates.reduce((columns, partition, i) => [
    ...columns,
    ...partition,
    ...i < partitionedDates.length - 1 && isSpecificDates ? [null] : [], // Add spacer in between partitions
  ], [] as (Temporal.PlainDate | null)[])
}

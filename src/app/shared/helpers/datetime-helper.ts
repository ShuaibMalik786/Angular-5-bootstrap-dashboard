export class DatetimeHelper {

  static minutesToSeconds(minutes: number) {
    return minutes * 60;
  }

  static hoursToSeconds(hours: number) {
    return DatetimeHelper.minutesToSeconds(hours * 60);
  }

  static daysToSeconds(days: number) {
    return DatetimeHelper.hoursToSeconds(days * 24);
  }
}

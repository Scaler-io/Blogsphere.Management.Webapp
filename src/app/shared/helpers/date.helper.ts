import * as moment from "moment";

export class DateHelper {
  public static formatDate(date: string): string {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  public static formatDateToTimeAgo(date: string): string {
    return moment(date).fromNow();
  }
}
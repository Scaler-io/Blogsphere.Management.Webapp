export interface DateFormatOption {
  parse: ParseInfo;
  display: DisplayInfo;
}

export interface ParseInfo {
  dateInput: string;
}

export interface DisplayInfo {
  dateInput: string;
  monthYearLabel: string;
  dateA11yLabel: string;
  monthYearA11yLabel: string;
}

export const DD_MM_YYYY: DateFormatOption = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const YYYY_MM_DD: DateFormatOption = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const ApprovedDateFormats = {
  dateMonthYear: DD_MM_YYYY,
  yearMonthDate: YYYY_MM_DD,
};

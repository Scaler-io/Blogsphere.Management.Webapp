export type DetailsCardMode = 'keyValue' | 'table';

export type DetailsCardCellVariant = 'default' | 'mono' | 'emphasis' | 'chip' | 'link';
export type DetailsCardCellAlign = 'left' | 'center';

export interface DetailsCardTableCell {
  text?: string;
  variant?: DetailsCardCellVariant;
  align?: DetailsCardCellAlign;
  status?: boolean;
}

export type DetailsCardTableRow = Array<string | DetailsCardTableCell>;

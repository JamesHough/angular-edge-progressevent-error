import { BrowserHeader } from './BrowserHeader';

export interface BrowserDetails {
  args: any;
  headers: BrowserHeader;
  origin: string;
  url: string;
}

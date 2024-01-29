import { Capacitor, registerPlugin } from '@capacitor/core';
import { XMLParser } from 'fast-xml-parser';

interface IPrinter {
  print(ticket: any): Promise<{ text: string }>;
}

const Printer = registerPlugin<IPrinter>('Printer');

export async function print(ticket: any) {
  if (Capacitor.isNativePlatform()) {
    return Printer.print({ lines: parseXml(ticket) });
  }
}

export function parseXml(ticket: string) {

  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    parseAttributeValue: true,
    trimValues: true,
    preserveOrder: true,
    attributeNamePrefix: '',
    numberParseOptions: {
      hex: false,
      leadingZeros: false
    }
  });

  const xmlNodes: any[] = parser.parse(ticket);
  
  return xmlNodes.map(node => {
    const keys = Object.keys(node);
    return { type: keys[0], ...node[':@'] };
  });
}

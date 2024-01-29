export function print(lines: (((width: number) => string) | string)[]) {

  const width = parseInt(localStorage.getItem('ticketWidth') || '40');
  const endLines = parseInt(localStorage.getItem('endLines') || '5');
  const ticket = lines.map(line => typeof line === 'string' ? line : line(width)).join('');

  const hideFrame = document.createElement('iframe');
  
  hideFrame.style.display = 'none';

  hideFrame.onload = () => {
    const closePrint = () => document.body.removeChild(hideFrame);
    hideFrame.contentWindow!.onbeforeunload = closePrint;
    hideFrame.contentWindow!.onafterprint = closePrint;
    hideFrame.contentWindow!.print();
  };

  hideFrame.srcdoc =
    '<html>'+
    '<body>'+
    '<pre>'+
    ticket+
    ''.padStart(endLines, ' \n')+
    ''+
    '</pre>'+
    '</body>'+
    '</html>';

  document.body.appendChild(hideFrame);
}

export function left(text: string) {
  return (width: number) => text.padStart(width, ' ');
}

export function center(text: string) {
  return (width: number) => {
    const diff = (width - text.length) / 2;
    return ''.padStart(diff) + text + ''.padEnd(diff) + '\n';
  };
}

export function newLine() {
  return () => ' \n';
}

export function line() {
  return (width: number) => {
    return ''.padStart(width, '-') + '\n';
  };
}

export function colums(col1: string, col2: string) {
  return (width: number) => {
    const spaces = width - (col1.length + col2.length);
    return col1 + col2.padStart(spaces + col2.length) + '\n';
  };
}

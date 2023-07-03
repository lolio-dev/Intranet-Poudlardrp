// @ts-nocheck

import * as chalk from 'chalk';

const COLOR_CODES = {
  0: chalk.hex('#000000'),
  1: chalk.hex('#0000AA'),
  2: chalk.hex('#00AA00'),
  3: chalk.hex('#00AAAA'),
  4: chalk.hex('#AA0000'),
  5: chalk.hex('#AA00AA'),
  6: chalk.hex('#FFAA00'),
  7: chalk.hex('#AAAAAA'),
  8: chalk.hex('#555555'),
  9: chalk.hex('#5555FF'),
  a: chalk.hex('#55FF55'),
  b: chalk.hex('#55FFFF'),
  c: chalk.hex('#FF5555'),
  d: chalk.hex('#FF55FF'),
  e: chalk.hex('#FFFF55'),
  f: chalk.hex('#FFFFFF')
}

const FORMAT_CODES = {
  l: chalk.bold,
  m: chalk.strikethrough,
  n: chalk.underline,
  o: chalk.italic
}

export const colorCode = (string: string): string => {
  let segments = string.split('&');
  for (let i = 1; i < segments.length; i++) {
    let code = segments[i].substr(0, 1);
    let previousCode = (i > 1) ? segments[i - 1].substr(-1) : null;

    if (COLOR_CODES[code]) {
      segments[i] = COLOR_CODES[code](segments[i].substr(1)) + code; // Color segment and move code to back for reference

    } else if (FORMAT_CODES[code]) {
      segments[i] = FORMAT_CODES[code](segments[i].substr(1)) + code;

      if (i > 1) {
        if (COLOR_CODES[previousCode]) segments[i] = COLOR_CODES[previousCode](segments[i].substr(1)) + previousCode; // Move the previous code to the back cause idk
      }

    } else if (code === 'r') {
      segments[i] = segments[i].substr(1) + code;
    } else if (i === 1) {
      segments[i] = '&' + segments[i] + 'r';
    } else if (i > 1) {
      segments[i] = previousCode + '&' + segments[i].substr(1);
      i--;
    }
  }

  for (let i = 1; i < segments.length; i++) segments[i] = segments[i].slice(0, -1);

  return segments.join('');
}
/**
 * Return a string of dashes.
 *
 * @param  {Number}  num
 * @param  {String}  char
 * @return {String}
 */
export default function dashes(num, char = '-') {
  let str = '';

  for (let i = 0; i < num; i += 1) {
    str += char;
  }

  return str;
}

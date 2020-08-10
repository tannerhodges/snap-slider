/**
 * Keep a value within some minimum and maximum values.
 * @param  {Number}  value
 * @param  {Number}  min
 * @param  {Number}  max
 * @return {Number}
 */
export default function minmax(value, min, max) {
  value = Math.min(max, value);
  value = Math.max(min, value);
  return value;
}

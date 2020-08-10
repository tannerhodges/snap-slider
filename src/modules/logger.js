/* eslint-disable indent */

// Helpers
import dashes from '../helpers/dashes';

/**
 * Get the substitution string for to format this value in a console.log.
 *
 * - %o = Object
 * - %d = Number (aka "Digit")
 * - %s = String
 * - %c = CSS
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
 * @param  {mixed}   value
 * @return {String}
 */
export function getSubstitution(value) {
  // Object
  if (typeof value === 'object') {
    return '%o';
  }

  // Number
  if (typeof value === 'number') {
    return '%d';
  }

  // When in doubt, assume everything else is a String.
  return '%s';
}

/**
 * Log a full debug section.
 *
 * @param  {Object}  params
 * @param  {Object}  params.heading
 * @return {void}
 */
export function section(params) {
  const {
    heading,
    description,
    groups,
    collapsed,
  } = params;

  // Allow groups to be collapsed.
  const method = collapsed ? 'groupCollapsed' : 'group';

  // HEADING
  console.log(`%c
┏━━${dashes(heading.length, '━')}━━┓
┃  ${heading}  ┃
┗━━${dashes(heading.length, '━')}━━┛`, 'font-size: 1.25em;', '\n\n',
  description,
  '\n\n');

  // GROUPS
  groups.forEach((group) => {
    // Heading
    console[method](`%c${group.heading}`, 'font-weight: bold;');

    // Build up a single console.log for all the items in the group.
    const args = [];
    let content = '';

    group.items.forEach((item) => {
      // eslint-disable-next-line no-shadow
      const { heading, description } = item;

      // Heading
      content += `\n%c${getSubstitution(heading)}\n`;
      args.push('text-decoration: underline;', heading);

      // Description
      content += `\n%c${getSubstitution(description)}\n`;
      args.push('text-decoration: none;', description);
    });

    // Log the items!
    console.log(content, ...args);

    // And end the group.
    console.groupEnd();
  });

  // Add an empty line after the section.
  console.log('\n');
}

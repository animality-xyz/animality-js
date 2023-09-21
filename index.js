const animals = [
  'cat',
  'dog',
  'bird',
  'panda',
  'redpanda',
  'koala',
  'fox',
  'whale',
  'dolphin',
  'kangaroo',
  'bunny',
  'lion',
  'bear',
  'frog',
  'duck',
  'penguin',
  'axolotl',
  'capybara'
];
const base = 'https://api.animality.xyz';

let fetch;

/**
 * @typedef {Object} AnimalObject
 * @property {string} name
 * @property {string} image
 * @property {string} fact
 */

module.exports = {
  /**
   * Returns an image and a fact of the specified animal type(s).
   * @param {string | string[]} [type='random'] The animal type(s).
   * @param {string} [apiKey] The API key.
   * @returns {AnimalObject | AnimalObject[]} The image and fact object.
   */
  async getAsync(type = 'random', apiKey) {
    if (fetch === undefined)
      ({ default: fetch } = await import('node-fetch'));

    const isArray = Array.isArray(type);
    if ((typeof type !== 'string' && !isArray) || isArray && (type = type.flat()) && !type.every(t => typeof t === 'string')) throw new TypeError("'type' must be a string or an array of strings");

    type = type === 'random' ? animals[Math.floor(Math.random() * animals.length)] : !isArray ? type.toLowerCase() : [...new Set(type.map(t => t.toLowerCase()))];
    
    if (!isArray && !animals.includes(type)) throw new TypeError(`'${type}' is not a valid type, the valid types are: ${animals.join(', ')}, random`);
 
    if (isArray) return Promise.all(type.map(t => this.getAsync(t, apiKey)));

    const fetchOptions = {
      headers: { 'X-API-Key': typeof apiKey === 'string' ? apiKey : null }
    };

    const [{ link: image }, { fact }] = await Promise.all([
      fetch(`${base}/img/${type}`, fetchOptions).then(res => res.json()),
      fetch(`${base}/fact/${type}`, fetchOptions).then(res => res.json())
    ]).catch(err => {
      throw new Error(`Failed to get type '${type}' from API, error:\n${err}`);
    });

    return { name: type, image, fact };
  }
};

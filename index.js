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
  'rabbit',
  'lion',
  'bear',
  'frog',
  'duck',
  'penguin',
  'axolotl',
  'capybara',
  'hedgehog',
  'turtle',
  'narwhal',
  'squirrel',
  'fish',
  'horse'
];

/**
 * @typedef {Object} AnimalObject
 * @property {string} type
 * @property {string} animal
 * @property {string} image
 * @property {string} fact
 * @property {string} image_id
 * @property {string} fact_id
 */

module.exports = {
  /**
   * Returns an image and a fact of the specified animal type(s).
   * @param {string | string[]} [type='random'] The animal type(s).
   * @returns {AnimalObject | AnimalObject[]} The data object.
   */
  async getAsync(type = 'random') {
    const isArray = Array.isArray(type);
    if ((typeof type !== 'string' && !isArray) || isArray && (type = type.flat()) && !type.every(t => typeof t === 'string')) throw new TypeError("'type' must be a string or an array of strings");

    type = type === 'random' ? animals[Math.floor(Math.random() * animals.length)] : !isArray ? type.toLowerCase() : [...new Set(type.map(t => t.toLowerCase()))];
    
    if (!isArray && !animals.includes(type)) throw new TypeError(`'${type}' is not a valid type, the valid types are: ${animals.join(', ')}, random`);
 
    if (isArray) return Promise.all(type.map(t => this.getAsync(t)));

    try {
      const animalResponse = await fetch(`https://api.animality.xyz/all/${type}`).then(res => res.json());
      const { animal, image, fact, image_id, fact_id } = animalResponse;

      return { type, animal, image, fact, image_id, fact_id };
    } catch (err) {
      throw new Error(`Failed to get type '${type}' from API:\n${err}`);
    }
  }
};

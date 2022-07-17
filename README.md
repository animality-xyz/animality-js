# animality-js
A simple API wrapper that generates images & facts of any animal

# Installation
```bash
$ npm install animality
```

The Node.js wrapper for this API is available for use in [Node Package Manager](https://www.npmjs.com/package/animality). It's use is pretty straight-forward.

# Usage
These are the 17 animal strings that can be used to send a request to the API:
* `cat`
* `dog`
* `bird` 
* `panda` 
* `redpanda` 
* `koala` 
* `fox` 
* `whale`
* `dolphin` 
* `kangaroo`
* `bunny`
* `lion`
* `bear`
* `frog`
* `duck`
* `penguin`
* `axolotl`

# Example
```js
const {Animality} = require('animality');
const animal = 'cat';
Animality.getAsync(animal, 'API_KEY').then(console.log);
```

This outputs the following object in the terminal:

```json
{
  "name": "cat",
  "image": "An image URL here",
  "fact": "A fact here"
}
```

Other than that, this package also allows you to request multiple animals at the same time.

```js
const {Animality} = require('animality');
const animals = ['cat', 'dog', 'panda'];
Animality.getAsync(animals, 'API_KEY').then(console.log);
```

This outputs the following array of objects in the terminal:

```json
[
  {
    "name": "cat",
    "image": "An image URL here",
    "fact": "A fact here"
  },
  {
    "name": "dog",
    "image": "An image URL here",
    "fact": "A fact here"
  },
  {
    "name": "panda",
    "image": "An image URL here",
    "fact": "A fact here"
  }
]
```

import undici from 'undici';

const animals: string[] = [
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

export class Animality {
    public static async getAsync(type: Animal, apiKey?: string): Promise<AnimalObject>;
    public static async getAsync(type: Animal[], apiKey?: string): Promise<AnimalObject[]>;
    public static async getAsync(type: Animal | Animal[], apiKey?: string): Promise<AnimalObject | AnimalObject[]> {
        if ((typeof type !== "string" && !Array.isArray(type)) || Array.isArray(type) && (type = type.flat()) && !type.every(t => typeof t === "string")) throw new Error("Type must be a string or an array of strings");

        if (!Array.isArray(type) && !animals.includes(type)) throw new Error("Type must be one of the following: " + animals.join(", "));
        if (Array.isArray(type) && !type.every(t => animals.includes(t))) throw new Error("Type must be one of the following: " + animals.join(", "));

        return Array.isArray(type) ? Promise.all(type.map(t => Animality.request(t, apiKey))) : Animality.request(type, apiKey);
    }

    private static async request(type: Animal, apiKey?: string): Promise<AnimalObject> {
        const options = {
            headers: { 'X-API-Key': typeof apiKey === 'string' ? apiKey : null }
        } as any;

        const [{ link }, { fact }] = await Promise.all([
            undici.fetch(`${base}/img/${type}`, options).then(res => res.json()) as Promise<{ link: string }>,
            undici.fetch(`${base}/fact/${type}`, options).then(res => res.json()) as Promise<{ fact: string }>
        ]).catch(err => {
            throw new Error(`Failed to get type '${type}'. Error:\n${err}`);
        });

        return { name: type, image: link, fact };
    }
}

export interface AnimalObject {
    name: string;
    image: string;
    fact: string;
}

export type Animal = 'cat' | 'dog' | 'bird' | 'panda' | 'redpanda' | 'koala' | 'fox' | 'whale' | 'dolphin' | 'kangaroo' | 'bunny' | 'lion' | 'bear' | 'frog' | 'duck' | 'penguin' | 'axolotl' | 'capybara' | 'random';
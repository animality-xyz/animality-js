declare module 'animality' {
  interface AnimalObject {
    name: string;
    image: string;
    fact: string;
  }

  namespace fns {
    export function getAsync(type?: string | string[]): Promise<AnimalObject | AnimalObject[]>;
  }

  export = fns;
}

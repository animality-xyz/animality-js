declare module 'animality' {
  interface AnimalObject {
    type: string;
    animal: string;
    image: string;
    fact: string;
    image_id: string;
    fact_id: string;
  }

  namespace fns {
    export function getAsync(type?: string | string[]): Promise<AnimalObject | AnimalObject[]>;
  }

  export = fns;
}

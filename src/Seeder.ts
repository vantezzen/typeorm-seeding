/**
 * Seeder class that is used to seed the database.
 */
export default abstract class Seeder {
  /**
   * Run the seeder.
   */
  abstract run(): Promise<void>;
}

/**
 * Factory class that is used to create entities.
 */
type Constructable<T> = new (...args: any[]) => T;

/**
 * Run multiple seeders in parallel.
 *
 * @param seeders Seeders to run
 * @returns The created entities as an array from each seeder
 */
export function runSeeders(seeders: Constructable<Seeder>[]) {
  return Promise.all(seeders.map((seeder) => new seeder().run()));
}

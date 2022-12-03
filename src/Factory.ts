import type { BaseEntity } from "typeorm";
import debugging from "debug";
import { AnyObject } from "./utils";

const debug = debugging("typeorm-seeding:factory");

/**
 * A factory for creating entities
 *
 * @template EntityType The exact class of the entity to create (e.g. User)
 * @template OptionsType The options object that is passed to the factory
 */
export default abstract class Factory<
  EntityType extends BaseEntity,
  OptionsType = any
> {
  private overrideData: AnyObject = {};

  /**
   * Create a factory for the given entity
   *
   * @param count Number of entities to create for each run of the factory (default: 1)
   */
  constructor(private count = 1) {}

  /**
   * Get the entity class that this factory creates
   */
  abstract getEntity(): typeof BaseEntity;

  /**
   * Get the data to seed the entity with
   *
   * @param options The options object that is passed to the factory
   */
  abstract getFactoryData(options?: OptionsType): AnyObject;

  private async createOne(options?: OptionsType) {
    debug(`Creating one entity of type ${this.getEntity().name}`);

    const seederEntity = this.getEntity();
    const seedData = this.getFactoryData(options);
    const entityData = { ...seedData, ...this.overrideData };
    debug(`Entity data: ${JSON.stringify(entityData)}`);

    const entity = new seederEntity() as EntityType;
    Object.assign(entity, entityData);
    await entity.save();

    debug(`Created entity: ${JSON.stringify(entity)}`);

    return entity;
  }

  /**
   * Let the factory run.
   * This will create the given number of entities and return them.
   *
   * @param options Options to pass to the factory
   * @returns The created entities
   */
  async create(options?: OptionsType) {
    debug(`Creating ${this.count} entities of type ${this.getEntity().name}`);

    const entities = [];
    for (let i = 0; i < this.count; i++) {
      debug(`Creating entity ${i + 1} of ${this.count}`);
      entities.push(await this.createOne(options));
    }

    debug(`Created ${entities.length} entities`);
    return entities;
  }

  /**
   * Override data of the created entities
   *
   * @param data Data to override the factory data with
   * @returns The factory
   */
  withOverrideData(data: AnyObject = {}) {
    this.overrideData = data;
    return this;
  }

  /**
   * Set the number of entities to create
   *
   * @param count Number of entities to create
   * @returns The factory
   */
  withCount(count: number) {
    this.count = count;
    return this;
  }
}

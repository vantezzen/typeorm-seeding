# @vantezzen/typeorm-seeding

> Laravel-inspired seeding system for TypeORM

[![NPM](https://img.shields.io/npm/v/@vantezzen/typeorm-seeding.svg)](https://www.npmjs.com/package/@vantezzen/typeorm-seeding) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package adds a seeding and factory pattern to TypeORM entities. If you are familiar with Seeding in Laravel or similar frameworks, you'll feel right at home!

The library is intentionally minimal and only implements required boilerplate so you can quickly create seeding data. It doesn't provide a CLI or commands to seed, but rather allows you to run the seeders anywhere in your code.

## Install

```bash
npm install @vantezzen/typeorm-seeding typeorm
```

It is highly recommended - though not required - to also install faker.js for generating fake data in your Factories:

```bash
npm install @faker-js/faker
```

## Usage

A complete example on how to use this library can be found in the "example" folder.

### Factory

A factory allows creating dummy instances of your entities.

Example of a factory for a "Purchase" entity:

```tsx
import { Factory } from "@vantezzen/typeorm-seeding";

// Your entity that you want to seed
import Purchase from "../entities/Purchase";

// Faker.js is recommended but not required
import { faker } from "@faker-js/faker";

export default class PurchaseFactory
  // Your factory should extend this package's base factory
  // The first generic is your entity. This is used to improve type support
  extends Factory<Purchase>
{
  // Implement a "getEntity" function that simply returns the entity class that should be used
  getEntity() {
    return Purchase;
  }

  // Implement a "getFactoryData" function that returns the data needed to instanciate a new entity
  getFactoryData() {
    return {
      shopName: faker.company.name(), // Faker is used here to get random data for each new entity
      purchasedAt: faker.date.past(),
    };
  }
}
```

To create new entities using this factory, simply call the "create()" method provided by the base factory:

```ts
const factory = new PurchaseFactory();
const purchases = await factory.create();
```

The return value is an **array** of entities.

#### Using options

Optionally, your factory can also type hint that options can be provided:

```tsx
import { Factory } from "@vantezzen/typeorm-seeding";
import Purchase from "../entities/Purchase";
import { faker } from "@faker-js/faker";

export type PurchaseFactoryOptions = {
  purchaseDate?: Date;
};

// Provide the type of your options as the second generic
export default class PurchaseFactory extends Factory<
  Purchase,
  PurchaseFactoryOptions
> {
  getEntity() {
    return Purchase;
  }

  // Please note that these options will be made optional - your factory should still work, even if "undefined" is supplied
  getFactoryData(options?: PurchaseFactoryOptions) {
    return {
      shopName: faker.company.name(),
      purchasedAt: options?.purchaseDate ?? faker.date.past(),
    };
  }
}
```

The option values can be provided using a parameter to ".create()":

```ts
const factory = new PurchaseFactory();
const purchases = await factory.create({
  purchaseDate: new Date(),
});
```

#### Override values

When using a factory, you might want to force override specific values. These can simply call "withOverrideData":

```ts
const factory = new PurchaseFactory();
const purchases = await factory
  .withOverrideData({
    shopName: "Foo Bar",
  })
  .create();
// shop name will be "Foo Bar" for all entitites
```

#### Creating multiple entities at once

".create()" will return an array of entities as the factory is designed to create multiple entities at once if needed.

To set the count of entities to create, you can:

- Pass the number to the constructor (like in Laravel):

```ts
const factory = new PurchaseFactory(10);
const purchases = await factory.create();
// "purchases" contains 10 entities
```

- Set the count with "withCount":

```ts
const factory = new PurchaseFactory();
const purchases = await factory.withCount(10).create();
// "purchases" contains 10 entities
```

### Seeder

Seeders allow calling and combining Factories. To create a seeder, simply extend the base seeder and implement a "run" method.

```ts
import { Seeder } from "@vantezzen/typeorm-seeding";

// Factories that you want to use in your seeder
import PurchaseFactory from "../factories/PurchaseFactory";
import PurchaseItemFactory from "../factories/PurchaseItemFactory";

export default class PurchaseSeeder extends Seeder {
  async run() {
    // Create 10 purchases
    const purchaseFactory = new PurchaseFactory(10);
    const purchases = await purchaseFactory.create();

    // Create 10 purchaseItems for each created purchase
    const purchaseItemFactory = new PurchaseItemFactory(10);
    purchases.forEach((purchase) => {
      purchaseItemFactory.create({ purchase });
    });
  }
}
```

You can simply call this "run" method to execute the seeder:

```ts
const seeder = new PurchaseSeeder();
await seeder.run();
```

#### Running multiple seeders

The library provides a simple helper method that allows running your seeders easily:

```ts
import PurchaseSeeder from "./PurchaseSeeder";
import SomeOtherSeeder from "./SomeOtherSeeder";
import { runSeeders } from "@vantezzen/typeorm-seeding";

const runAllSeeders = () => runSeeders([PurchaseSeeder, SomeOtherSeeder]);

await runAllSeeders();
```

You may also use this function inside your seeders to call other seeders. Please note that your provided seeders will run pseudo-parallel using `Promise.all` so do not expect certain seeders to have completed before others.

## Development

1. Clone this repository
2. Run `npm install` in the root directory and `/example` (`npm i && cd example && npm i`)
3. Run `npm start` in `/example` to start development using the example project
4. You can use `npm test` to run the Jest tests

## License

MIT © [vantezzen](https://github.com/vantezzen)

---

This project is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

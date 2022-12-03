import "reflect-metadata";
import { DataSource } from "typeorm";
import { initializeDataSource } from "./testing/datasource";
import DummyFactory from "./testing/DummyFactory";

let dataSource: DataSource;

beforeAll(async (): Promise<DataSource> => {
  dataSource = await initializeDataSource();

  return dataSource;
});

afterAll(async () => dataSource.destroy());

describe("Factory", () => {
  it("uses the provided entity", async () => {
    const factory = new DummyFactory();
    const entities = await factory.create();
    expect(entities[0].isDummyEntity).toBe(true);
  });

  it("prioritizes override data", async () => {
    const factory = new DummyFactory();
    const entities = await factory
      .withOverrideData({
        text: "foo",
      })
      .create();
    expect(entities[0].text).toBe("foo");
  });

  it("produces number of requested entities", async () => {
    const factory = new DummyFactory(10);
    const entities = await factory.create();
    expect(entities).toHaveLength(10);
  });

  it("produces number of requested entities using withCount", async () => {
    const factory = new DummyFactory(5);
    const entities = await factory.withCount(10).create();
    expect(entities).toHaveLength(10);
  });

  it("produces different entities", async () => {
    const factory = new DummyFactory(2);
    const entities = await factory.create();
    expect(entities[0]).not.toBe(entities[1]);
  });

  it("passes options to factory data", async () => {
    const factory = new DummyFactory();
    const entities = await factory.create({
      data: "bar",
    });
    expect(entities[0].text).toBe("bar");
  });

  it("uses factory data as default", async () => {
    const factory = new DummyFactory();
    const entities = await factory.create();
    expect(entities[0].text).toBe("Dummy");
  });
});

export {};

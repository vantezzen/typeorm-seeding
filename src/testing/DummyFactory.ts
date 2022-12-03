import Factory from "../Factory";
import DummyEntity from "./DummyEntity";

export default class DummyFactory extends Factory<
  DummyEntity,
  { data: string } | null
> {
  getEntity() {
    return DummyEntity;
  }

  getFactoryData(options: any) {
    return {
      text: options?.data ?? "Dummy",
    };
  }
}

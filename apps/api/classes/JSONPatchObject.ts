export class JSONPatchObject {
  constructor(_property: string, _value: string) {
    this.Property = _property;
    this.Value = _value;
  }
  Property: string;
  Value: string | number | boolean;
}

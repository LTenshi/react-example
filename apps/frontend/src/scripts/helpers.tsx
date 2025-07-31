import { JSONPatchObject } from '@/classes/JSONPatchObject';

export function getRating(rating: number): string {
  if (rating > 10 || rating < 0) {
    throw new Error('Rating not within expected range of 0 and 10');
  }

  switch (rating) {
    //Half stars are not yet supported in many browsers so we'll bundle some values together
    case 0:
    case 1:
      return '☆☆☆☆☆';
    case 2:
    case 3:
      return '★☆☆☆☆';
    case 4:
    case 5:
      return '★★☆☆☆';
    case 6:
    case 7:
      return '★★★☆☆';
    case 8:
    case 9:
      return '★★★★☆';
    case 10:
      return '★★★★★';
    default:
      return 'No Score';
  }
}

export function PerformPatchOperation(
  jsonPatchArray: JSONPatchObject[],
  Property: string,
  Value: string | number | boolean,
) {
  const modifiedPatchArray = [...jsonPatchArray];
  const existingPatchValue = modifiedPatchArray.find(
    (patch) => patch.Property === Property,
  );

  if (existingPatchValue) {
    existingPatchValue.Value = Value;
  } else {
    modifiedPatchArray.push({
      Property: Property,
      Value: Value,
    });
  }

  return modifiedPatchArray;
}

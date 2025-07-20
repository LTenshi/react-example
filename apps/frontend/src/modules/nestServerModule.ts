import { ExampleObjectDTO } from "@/classes/ExampleObjectArrayDTO"

export default class nestServerModule {
  public async getExample(signal?: AbortSignal): Promise<string> {
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example", {
      method: "GET",
      signal: signal
    })
    .catch((err) => {
      throw new Error(err)
    })
    .then((res) => {
      return res.text()
    })
  }

  public async getArrayObjectExample(signal?: AbortSignal): Promise<ExampleObjectDTO[]> {
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example/array-object", {
      method: "GET",
      signal: signal
    })
    .catch((err) => {
      throw new Error(err)
    })
    .then((res) => {
      return res.json() as unknown as ExampleObjectDTO[];
    })
  }

  public async postExample( dataIn: string, signal?: AbortSignal,): Promise<string> {
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example", {
      method: "POST",
      body: JSON.stringify({ example: dataIn }),
      headers: {
        "Content-Type": "application/json"
      },
      signal: signal
    })
    .catch((err) => {
      throw new Error(err)
    })
    .then((res) => {
      return res.text()
    });
  }
}
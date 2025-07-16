export default class nestServerModule {
  public async getExample(): Promise<string> {
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example")
    .catch((err) => {
      throw new Error(err)
    })
    .then((res) => {
      return res.text()
    })
  }

  public async postExample(dataIn: string): Promise<string> {
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example", {
      method: "POST",
      body: JSON.stringify({ example: dataIn }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
    .then((res) => {
      return res.text()
    });
  }
}
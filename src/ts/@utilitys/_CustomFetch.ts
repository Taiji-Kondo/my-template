export class CustomFetch {

  // Fetch of GET
  public static get = async ($urlWithParameter: string) => {
    const response = await fetch($urlWithParameter);
    return response.json();
  }
}
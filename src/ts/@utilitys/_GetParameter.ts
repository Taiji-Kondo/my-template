export class GetParameter {
  static readonly getParameter = (paramName: string, url = window.location.href) => {
    paramName = paramName.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
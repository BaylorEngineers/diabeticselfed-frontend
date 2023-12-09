const environment = {
baseUrl:"http://localhost:8080"
};
// if (process.env.REACT_APP_ENV === "development") {
//     environment .baseUrl = "http://dev.project .com";
// }
if (process.env.REACT_APP_ENV === "production"){
    environment.baseUrl = "https://seal-app-by4vt.ondigitalocean.app";
}
export default environment;
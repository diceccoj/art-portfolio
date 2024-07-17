//for injecting CSRF Token into submit forms
const x = sessionStorage.getItem("csrftoken");
const csrftoken = x ? x : "";

const CSRFToken = () => {
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};
export default CSRFToken;

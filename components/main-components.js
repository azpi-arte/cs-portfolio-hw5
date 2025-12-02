// injects commonly used componenets into the page i.e navbar, buttons, etc...1

fetchComponents() {
  const result = await fetch('./main-components');
  const text = await result.text();
  const doc = new DOMParser(text, 'text/html');
  return doc.getElementById("");
}
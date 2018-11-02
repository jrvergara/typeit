export default function (string) {

  let parser = new DOMParser();
  let doc = parser.parseFromString(string, "text/html");
  let nodes = [].slice.call(doc.body.querySelectorAll('*'));

  //-- Replace node instances with placeholders.
  nodes.forEach(item => {
    string = string.replace(item.outerHTML, '{%}');
  });

  let stringArray = string.split('');

  //-- Replace placeholders w/ nodes.
  stringArray.forEach((item, index) => {

    //-- Check for a placeholder.
    if (
      item === '{' &&
      stringArray[index + 1] === '%' &&
      stringArray[index + 2] === '}'
    ) {
      //-- Insert element.
      stringArray.splice(index, 3, nodes.shift());
    }
  });

  return stringArray;
}

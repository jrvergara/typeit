export default function (string) {

  let parser = new DOMParser();
  let tempDoc = parser.parseFromString(string, "text/html");
  let stringNodes = tempDoc.body.querySelectorAll('*');

  //-- Replace node instances with placeholders.
  [].slice.call(stringNodes).forEach((item, index) => {
    string = string.replace(item.outerHTML, '{%}');
  });

  let stringArray = string.split('');

  //-- Replace placeholders w/ nodes.
  stringArray.forEach((item, index) => {
    if (
      item === '{' &&
      stringArray[index + 1] === '%' &&
      stringArray[index + 2] === '}'
    ) {
      //-- Insert element.
      stringArray.splice(index, 3, '<TAG>');
    }
  });

  return stringArray;
}

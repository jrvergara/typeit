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

      //-- Remove placeholder.
      stringArray.splice(index, 3);

      //-- For each character inside this node, insert an object.
      let i = index;
      let node = nodes.shift();
      node.innerHTML.split('').forEach(character => {

        let atts = [].slice.call(node.attributes).map(att => {
          return {
            name: att.name,
            value: att.nodeValue
          }
        });

        stringArray.splice(i, 0, {
          tag: node.tagName,
          attributes: atts,
          content: character,
          isFirstCharacter: i === index
        });

        i++;
      });
    }
  });

  return stringArray;
}

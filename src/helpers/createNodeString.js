export default function ({
  tag,
  attributes = [],
  content = ''
}) {

  let node = document.createElement(tag);

  if(attributes !== undefined) {
    attributes.forEach(att => {
      node.setAttribute(att.name, att.value);
    });
  }

  node.innerHTML = content;

  return node.outerHTML;
}

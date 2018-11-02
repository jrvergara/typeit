export default function ({
  tag,
  attributes = [],
  content = ''
}) {

  let node = document.createElement(tag);

  attributes.forEach(att => {
    node.setAttribute(att.name, att.nodeValue);
  });

  node.innerHTML = content;

  return node.outerHTML;
}

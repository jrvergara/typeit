import Instance from '../src/instance.js';

let instance;

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <span id="element"></span>
    </div>
  `;

  instance = new Instance(
    document.getElementById('element'),
    'arbitrary-id',
    {},
    true,
    null
  )
});

test("Queues string length when simple string is passed.", () => {
  instance.queueDeletions('hello');
  expect(instance.queue).toHaveLength(6);
  expect(instance.queue).toMatchSnapshot();
});

test("Queues number when number is passed.", () => {
  instance.queueDeletions(6);
  expect(instance.queue).toHaveLength(7);
  expect(instance.queue).toMatchSnapshot();
});

test("Queues correct length when HTML is passed.", () => {
  instance.queueDeletions('Some <strong>HTML</strong>.');
  expect(instance.queue).toHaveLength(11);
  expect(instance.queue).toMatchSnapshot();
});

test("Queues correct length when multiple HTML tags are passed.", () => {
  instance.queueDeletions('Some <strong>HTML</strong>. And <i>more</i>.');
  expect(instance.queue).toHaveLength(21);
  expect(instance.queue).toMatchSnapshot();
});

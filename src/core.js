import { generateHash, toArray } from "./utilities";
import toArrayOfNodes from "./helpers/toArrayOfNodes";
import Instance from "./Instance";

//@todo does this need to be a class at all?
export default class Core {
  constructor(element, args, autoInit = true) {
    this.instances = [];
    this.generateInstances({
      elements: toArrayOfNodes(element),
      id: generateHash(),
      autoInit,
      args
    });
  }

  generateInstances(args) {
    args.elements.forEach(element => {
      this.instances.push(
        new Instance(element, args.id, args.args, args.autoInit, this)
      );
    });
  }

  /**
   * Push a specific action into the queue of each instance.
   * If an instance has already completed, trigger the queeu again.
   *
   * @param {string} function
   * @param {*} argument
   */
  queueUp(action, argument = null) {
    //@todo what is this? needed?
    this.init(true);

    this.instances.forEach(instance => {
      instance.queue.push([instance[action], argument]);

      if (instance.isComplete === true) {
        instance.next();
      }

      //-- We KNOW we have items to process now, so make sure we set this to false.
      instance.isComplete = false;
    });
  }
}

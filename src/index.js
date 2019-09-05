/**
 * A class for creating custom page linters
 */
class Lintos {
  /**
   * @constructor
   * @param {DocumentFragment} [doc] document fragment to be passed to linters
   */
  constructor(doc=window.document){
    this.issues = [];
    this.linters = [];
    this.doc = doc.cloneNode();
  }

  /**
   * @param {string} msg A string representing an error message
   * @param {NodeList} elements An HTMLElement or NodeList of affected elements
   */
  addError(msg, elements){
    this._addIssue("Error", msg, elements);
  }

  /**
   * @param {string} msg A string representing a warning message
   * @param {NodeList} elements An HTMLElement or NodeList of affected elements
   */
  addWarning(msg, elements){
    this._addIssue("Warning", msg, elements);
  }

  _addIssue(type, msg, elements){
    if (typeof(msg) !== 'string')
      throw new Error('${type} message must be a string');
    this.issues.push({
      type: type,
      msg: msg,
      elements: elements
    });
  }

  /**
   * Add a new linter
   * @param {string} id - A unique ID for the linter
   * @param {function} linter - A function to be executed, called with an HTML fragment as its argument
   */
  addLinter(id, linter){
    if (typeof(linter) !== 'function')
      throw new Error('Linter must be function');
    if (this.linters.filter((o) => o.id === id).length > 0)
      throw new Error('Duplicate linter id');
    this.linters.push({
      id: id,
      fn: linter
    });
  }

  /**
   * Execute all added linters
   */
  run(){
    this.linters.forEach((linter) => linter.fn(this.doc))
  }

  get errors(){
    return this.issues.filter((issue) => issue.type === "Error");
  }

  get warnings(){
    return this.issues.filter((issue) => issue.type === "Warning");
  }
}

export default Lintos

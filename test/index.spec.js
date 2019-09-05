import Lintos from "../src/index.js";

const linter = () => true;

test('Lintos is a thing', () => {
  expect(new Lintos()).toBeInstanceOf(Lintos);
});

test('Can add linter', () => {
  let lintos = new Lintos();
  lintos.addLinter('E1', () => true);
  expect(lintos.linters.length).toEqual(1);
});

test('Can add an error', () => {
  let lintos = new Lintos();
  lintos.addError('Very bad');
  expect(lintos.errors[0].msg).toEqual('Very bad');
});

test('Can add a warning', () => {
  let lintos = new Lintos();
  lintos.addWarning('Not as bad');
  expect(lintos.warnings[0].msg).toEqual('Not as bad');
});

test('Cannot have duplicate linter id', () => {
  let lintos = new Lintos();
  lintos.addLinter('E1', linter);
  expect(() => lintos.addLinter('E1', linter)).toThrow();
});

test('Linter must be a function', () => {
  let lintos = new Lintos();
  expect(() => lintos.addLinter('E1', 'a string')).toThrow();
});

test('Can run all linters', () => {
  let lintos = new Lintos();
  lintos.addLinter('E1', () => lintos.addError('error 1'));
  lintos.addLinter('E2', () => lintos.addError('error 2'));
  lintos.addLinter('W1', () => lintos.addWarning('warning 1'));
  lintos.addLinter('W2', () => lintos.addWarning('warning 2'));
  lintos.addLinter('W3', () => lintos.addWarning('warning 3'));
  lintos.run();
  expect(lintos.errors.length).toEqual(2);
  expect(lintos.warnings.length).toEqual(3);
});

import { EventEmitter } from 'events';

const BackHandler = new EventEmitter();

BackHandler.addEventListener = jest.fn();
BackHandler.removeEventListener = jest.fn();

export { BackHandler };

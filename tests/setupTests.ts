import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';
import 'isomorphic-fetch';

jest.setTimeout(30000);

configure({
  adapter: new Adapter(),
});

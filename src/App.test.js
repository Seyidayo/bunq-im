import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import App from './App';

test('renders eithout crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

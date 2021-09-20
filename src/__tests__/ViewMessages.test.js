import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import ViewMessages from 'app/components/UI/organisms/ViewMessages';

describe('<ViewMessages />', () => {
  it('It renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ViewMessages />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import ViewUsers from 'app/components/UI/organisms/ViewUsers';

describe('<ViewUsers />', () => {
  it('It renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ViewUsers />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

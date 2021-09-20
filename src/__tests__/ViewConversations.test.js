import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import ViewConversations from 'app/components/UI/organisms/ViewConversations';

describe('<ViewConversations />', () => {
  it('It renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ViewConversations />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

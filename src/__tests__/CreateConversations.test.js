import renderer from 'react-test-renderer';
import CreateConversations from 'app/components/UI/molecules/CreateConversationsModal';
import { BrowserRouter } from 'react-router-dom';

describe('<CreateConversations />', () => {
  it('It renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <CreateConversations />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

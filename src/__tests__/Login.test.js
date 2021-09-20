import renderer from 'react-test-renderer';
import LoginPage from 'app/components/pages/Login.page';

describe('<LoginPage />', () => {
  it('It renders correctly and matches snapshot', () => {
    const tree = renderer.create(<LoginPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import Spinner from 'app/components/UI/atoms/Spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Spinner height="30px" width="30px" />
    </div>
  );
};

export default Loader;

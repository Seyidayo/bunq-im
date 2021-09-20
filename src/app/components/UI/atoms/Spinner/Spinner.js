import PropTypes from 'prop-types';

const Spinner = ({ width, height }) => {
  return (
    <div
      className="spinner"
      style={{ inlineSize: width, blockSize: height }}
    ></div>
  );
};

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Spinner;

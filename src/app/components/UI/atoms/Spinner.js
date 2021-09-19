const Spinner = ({ width, height }) => {
  return (
    <div
      className="spinner"
      style={{ inlineSize: width, blockSize: height }}
    ></div>
  );
};

export default Spinner;

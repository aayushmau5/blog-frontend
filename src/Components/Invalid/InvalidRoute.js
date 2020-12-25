import './Invalid.css';

const invalidRoute = () => {
  return (
    <div className="invalid-container">
        <div className="invalid-status">404</div>
        <div className="invalid-message">Invalid Route</div>
    </div>
  );
};

export default invalidRoute;

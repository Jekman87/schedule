import React from 'react';
import ApiService from '../../services/api-service';

function TestApi() {
  const api = new ApiService();

  api.getAllEvents().then((data) => console.log(data))

  return (
    <div className="test-ape">TestApi</div>
  );
}

export default TestApi;

import React from "react";

const notAutorized = () => {
  return (
    <div>
      <h1>Not Autorized</h1>
      <img src="/assets/images/403.svg" alt="Not Autorized" />
    </div>
  );
};

export default notAutorized;
notAutorized.noAuth = true;

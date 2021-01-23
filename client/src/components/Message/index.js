import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div className={variant} role="alert">
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "alert alert-primary",
};

export default Message;

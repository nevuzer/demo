import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";

export const ErrorMessage = (props) => {
  const { message } = props;

  return <Alert severity="error">{message}</Alert>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

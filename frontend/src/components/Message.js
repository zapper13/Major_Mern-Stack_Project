/**
 * The function exports a React component that displays an alert message with a specified variant and
 * message content.
 * @returns The `Message` component is being returned, which renders an `Alert` component from the
 * `react-bootstrap` library with the specified `variant` and `children` props. The `variant` prop
 * determines the color scheme of the alert (e.g. `info`, `success`, `warning`, `danger`). The
 * `children` prop is the content to be displayed inside the alert. The `
 */
import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message

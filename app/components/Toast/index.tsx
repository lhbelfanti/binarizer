import { ERROR, INFO, SUCCESS, WARNING } from '@components/Toast/constants';
import { ToastProps } from '@components/Toast/types';

const Toast = (props: ToastProps) => {
  const { message, type } = props;

  // Define styles based on the type of toast
  const getToastStyle = () => {
    switch (type) {
      case SUCCESS:
        return { background: 'linear-gradient(to right, #10b981, #059669)' };
      case WARNING:
        return { background: 'linear-gradient(to right, #f59e0b, #d97706)' };
      case ERROR:
        return { background: 'linear-gradient(to right, #ef4444, #dc2626)' };
      case INFO:
      default:
        return { background: 'linear-gradient(to right, #3b82f6, #2563eb)' };
    }
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '1rem',
        color: 'white',
        fontSize: '1rem',
        borderRadius: '0.375rem',
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        ...getToastStyle(),
      }}>
      {message}
    </div>
  );
};

export default Toast;

import { ERROR, INFO, SUCCESS, WARNING } from '@components/Toast/constants';
import { ToastProps } from '@components/Toast/types';

const Toast = (props: ToastProps) => {
  const { message, type } = props;

  // Define styles based on the type of toast
  const getToastStyle = () => {
    switch (type) {
      case SUCCESS:
        return {
          background: 'linear-gradient(to right, #10b981, #059669)',
          borderLeft: '4px solid #047857',
        };
      case WARNING:
        return {
          background: 'linear-gradient(to right, #f59e0b, #d97706)',
          borderLeft: '4px solid #b45309',
        };
      case ERROR:
        return {
          background: 'linear-gradient(to right, #ef4444, #dc2626)',
          borderLeft: '4px solid #b91c1c',
        };
      case INFO:
      default:
        return {
          background: 'linear-gradient(to right, #3b82f6, #2563eb)',
          borderLeft: '4px solid #1d4ed8',
        };
    }
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
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

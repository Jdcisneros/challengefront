import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface AllAlerts {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
  onClose: () => void;
}

export default function AllAlerts({ message, severity, open, onClose }: AllAlerts) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}  sx={{ zIndex: 1301 }} >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
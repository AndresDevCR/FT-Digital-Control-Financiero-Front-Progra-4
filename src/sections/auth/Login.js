import { Tooltip, Stack, Typography, Link, Box } from '@mui/material';
import { useAuthContext } from '../../auth/useAuthContext';
import LoginLayout from '../../layouts/login';
import AuthLoginForm from './AuthLoginForm';

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>

      
      <Stack spacing={2} sx={{ mb: 5, position: 'relative', marginTop: '20vh' }}>
      <Tooltip placement="center">
          <Box
            component="img"
            alt={method}
            src="https://i.imgur.com/gFGwJeF.png"
            sx={{
              width: '100%',
              maxWidth: 550,
              height: 'auto',
              position: 'absolute',
              bottom: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Tooltip>
        <Typography variant="h4">Control Financiero</Typography>

        {/* <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>
          <Link variant="subtitle2">Create an account</Link>
        </Stack> */}
      </Stack>

      <Box sx={{justifyContent: 'center' }}>
        <AuthLoginForm />
      </Box>
    </LoginLayout>
  );
}

import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export const MenuUsuario: React.FC = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Box gap={1} display='flex' alignItems='center' padding={1}>
        <Avatar sx={{ height: theme.spacing(4), width: theme.spacing(4) }}>US</Avatar>
        {!lgDown && <Typography variant='button'>Olá, <strong>Usuario</strong>.</Typography>}
      </Box>
    </>
  );
};
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AppBar, Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useAppThemeContext } from '../../../contexts';
import { MenuUsuario } from '../menu-usuario/MenuUsuario';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useAppThemeContext();

  return (
    <AppBar color='inherit' position='relative'>
      <Box display='flex' flex={1} alignContent='center' justifyContent='center'>
        <Box
          display='flex'
          flex={1}
          justifyContent='space-between'
          alignItems='center'
          paddingX={theme.spacing(4)}
          paddingY={theme.spacing(2)}
          gap={2}
        >
          <Box display='flex' flex={1} justifyContent='end'>
            <Tooltip
              title={
                theme.palette.mode === 'dark'
                  ? 'Mudar para tema Light'
                  : 'Mudar para tema Dark'
              }>
              <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            <MenuUsuario />
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};
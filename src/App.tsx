import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, MenuProvider } from './shared/contexts';
import { queryClient } from './shared/services/queryClient';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SplashScreen } from './shared/components';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <AppThemeProvider>
            {isLoading ? (
              <SplashScreen setIsLoading={setIsLoading} />
            ) : (
              <MenuProvider>
                <AppRoutes />
              </MenuProvider>
            )}
          </AppThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

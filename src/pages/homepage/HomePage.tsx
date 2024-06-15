import { Box, Chip, Icon, IconButton, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/MUI/button/Button';
import { LayoutBase } from '../../shared/layouts';
import { productService } from '../../shared/services/api/produto/productService';

moment.locale('pt-br');

export const HomePage = () => {
  const navigate = useNavigate();

  const { data: products, refetch } = useQuery(
    ['products'],
    () => productService.get()
  );

  return (
    <LayoutBase>
      <Box display='flex' flexDirection='column' gap={3}>
        <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h4'>Produtos</Typography>

              <Button label='+ Novo' variant='contained' onClick={() => navigate('/product')} />
            </Box>

            <Box display='flex' flexDirection='column' gap={2}>
              <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                <Box display='flex' flexDirection='column'>
                  {products && products.map(product =>
                    <Box key={product._id} display='flex' justifyContent='space-between' alignItems='center' margin={1}>
                      <Box>
                        <Box display='flex' gap={2} alignItems='center'>
                          <Typography variant='h4'>{product.name}</Typography>

                          <Chip label={product.vencido ? 'Vencido' : product.vencendo ? 'Vencendo' : 'Ok'} color={product.vencido ? 'error' : product.vencendo ? 'warning' : 'success'} />
                        </Box>

                        <Typography>{moment(product.dueDate).format('LL')}</Typography>
                      </Box>

                      <Box>
                        <IconButton
                          onClick={() => {
                            productService.remove(product._id)
                              .then(() => {
                                refetch();
                              });
                          }}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Box>
    </LayoutBase >
  );
};
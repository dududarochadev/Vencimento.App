import { Box, CircularProgress, Paper } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/MUI/button/Button';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { productService } from '../../shared/services/api/produto/productService';
import { VTextFieldDate } from '../../shared/forms/VTextFieldDate';

moment.locale('pt-br');

interface IFormData {
  name: string,
  dueDate: Date
}
export const ProductView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: IFormData) => {
    formRef.current?.setErrors({});

    setIsLoading(true);

    const parsedDate = moment(data.dueDate, 'DD/MM/YYYY', true).toDate();

    await productService.create({ name: data.name, dueDate: parsedDate });

    setIsLoading(false);

    navigate('/homepage');
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <LayoutBase>
      {
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Paper
            variant='outlined'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              padding: 3,
            }}
          >
            <VTextField name='name' label='Descricao' />
            <VTextFieldDate name='dueDate' label='Data de validade' />

            <Box display='flex' justifyContent='end' gap={1}>
              <Button
                label='Criar'
                variant='contained'
                type='submit'
                disabled={isLoading}
              />
            </Box>
          </Paper>
        </Form >
      }
    </LayoutBase >
  );
};
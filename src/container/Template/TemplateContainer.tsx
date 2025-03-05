import * as React from 'react';

import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  createTheme, 
  ThemeProvider,
  Autocomplete,
  Chip,
  Typography, 
} from '@mui/material';

import { CardBacklogComponents } from '../../components/CardBacklog/CardBacklogComponents.tsx';
import { ICardBacklogComponentsProps } from "../../components/CardBacklog/CardBacklogComponents.types";

import { useTemplateContainerRules } from './TemplateContainer.rules.ts';

const themeMode = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const TemplateContainer = () => {

  const {
    textInputs,
    setTextInputs,
    handleTagInputChange,
    handleDeleteTag,
    handleKeyDown,
  } = useTemplateContainerRules();
  
  const categories: ICardBacklogComponentsProps[] = [
    {
      order: 1,
      id: 10,
      title: "Ajustes na logica do carrinho do site",
      createdBy: "Lincoln",
      state: "Fazendo",
      tags: ["CARRINHO"],
      tasks: [
        {
          id: 101,
          title: "Criar lógica de adicionar produto ao carrinho",
          assignedTo: "Gustavo",
          state: "Feito",
          description: "Pegue o icone de adicionar ao carrinho e faça a lógica de adicionar o produto ao carrinho",
        },
        {
          id: 102,
          title: "Criar lógica de remover produto do carrinho",
          assignedTo: "Gustavo",
          state: "Fazendo",
          description: "Pegue o icone de remover do carrinho e faça a lógica de remover o produto do carrinho",
        },
        {
          id: 103,
          title: "Criar lógica de calcular o valor total do carrinho",
          assignedTo: "Gustavo",
          state: "A Fazer",
          description: "Calcular o valor total do carrinho e exibir na tela",
        },
        {
          id: 104,
          title: "Criar lógica de calcular o valor total do carrinho",
          assignedTo: "Gustavo",
          state: "A Fazer",
          description: "Calcular o valor total do carrinho e exibir na tela",
        },
        {
          id: 105,
          title: "Criar lógica de calcular o valor total do carrinho",
          assignedTo: "Gustavo",
          state: "A Fazer",
          description: "Calcular o valor total do carrinho e exibir na tela",
        },
        {
          id: 106,
          title: "Criar lógica de calcular o valor total do carrinho",
          assignedTo: "Gustavo",
          state: "A Fazer",
          description: "Calcular o valor total do carrinho e exibir na tela",
        },
        {
          id: 107,
          title: "Criar lógica de calcular o valor total do carrinho",
          assignedTo: "Gustavo",
          state: "A Fazer",
          description: "Calcular o valor total do carrinho e exibir na tela",
        },
      ]
    },
    {
      order: 2,
      id: 11,
      title: "Ajustes no layout do site",
      createdBy: "Lincoln",
      state: "A Fazer",
      tags: ["LAYOUT", "FRONTEND"],
      tasks: [
        {
          id: 111,
          title: "Ajustar o layout da página de produtos",
          assignedTo: "Lincoln",
          state: "Feito",
          description: "Ajustar o layout da página de produtos para que fique responsivo",
        },
        {
          id: 112,
          title: "Ajustar o layout da página de carrinho",
          assignedTo: "Lincoln",
          state: "Fazendo",
          description: "Ajustar o layout da página de carrinho para que fique responsivo",
        },
      ]
    },
    {
      order: 3,
      id: 12,
      title: "Fazer lógica do site",
      createdBy: "Gustavo",
      state: "Feito",
      tags: [],
      tasks: []
    }
  ];

  return (
    <ThemeProvider theme={themeMode}>

      <Container>

        <Box sx={{ margin: '30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px'}}>
            <img 
              src="../../../../glLogomarca.png" 
              alt="gl-Logomarca-Preta" 
              style={{ width: '50px', height: 'auto', transform: 'scale(3)' }} 
            />        
          <Typography variant='h3' color='primary' align='center'>
            Taskers
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='Digite o título da categoria'
              value={textInputs.title}
              onChange={(e) => setTextInputs({ ...textInputs, title: e.target.value })}
              variant='outlined'
              required
              fullWidth
            />

            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={textInputs.tags}
              inputValue={textInputs.tagsInput}
              onInputChange={handleTagInputChange}
              onChange={(_, newValue) =>
                setTextInputs((prev) => ({ ...prev, tags: newValue }))
              }
              renderTags={(value: string[], getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    id="tag"
                    key={index}
                    label={option}
                    onDelete={() => handleDeleteTag(option)}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Digite a(s) tag(s) e pressione 'Enter"
                  fullWidth
                  onKeyDown={handleKeyDown}
                />
              )}
            />
        </Box>

        <Box sx={{ margin: '30px 0' }}>
          <Button onClick={() => {
            if (textInputs.title === '' || textInputs.tags.length === 0) {
              alert('Preencha todos os campos para criar uma categoria');
              return;
            }else{
              alert(
                `categoria criada com sucesso! \n\nTítulo: ${textInputs.title} \nTags: ${textInputs.tags.join(', ')}`
              )
            }
          }} variant='contained' color='primary'>
            Criar categoria 
          </Button>
        </Box>

         <Box sx={{ width: '100%', mx: "auto", mt: 4 }}>
            {categories.map((categories) => (
               <CardBacklogComponents key={categories.id} {...categories} />
            ))}
         </Box>

      </Container>

    </ThemeProvider>
  );
};

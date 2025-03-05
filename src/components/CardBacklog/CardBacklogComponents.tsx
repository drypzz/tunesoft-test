import React from "react";
import { 
   Card, CardContent, Typography, Chip, Box, Avatar, Button, 
   Accordion, AccordionSummary, AccordionDetails, 
   List, ListItem, IconButton
} from "@mui/material";
import { AddCircle, Delete, Edit, ExpandMore } from "@mui/icons-material";

import { ICardBacklogComponentsProps } from "./CardBacklogComponents.types";

export const CardBacklogComponents = ({
   order,
   id,
   title,
   createdBy,
   state,
   tags = [],
   tasks = [],
}: ICardBacklogComponentsProps) => {
   return (
      <Card sx={{ mb: 2, p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "rgba(255, 255, 255, 0.01)" }}>
         <CardContent>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <Typography variant="h6">{order}. {title}</Typography>

               <Chip 
                  label={
                     state === "Feito" ? "Feito" :
                     state === "Fazendo" ? "Fazendo" :
                     "A Fazer"
                  }
                  color={
                     state === "Feito" ? "success" :
                     state === "Fazendo" ? "info" :
                     "default"
                  }
                  onClick={() => {console.log('Abrir Modal para mudar o status')}}
               />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
               <Box sx={{ display: "flex", alignItems: "center"}}>
                  <Typography variant="body2" color="textSecondary">
                     ID: {id} | Criado por 
                  </Typography>
                  <Chip sx={{ ml: 1 }} avatar={<Avatar>{createdBy[0]}</Avatar>} label={createdBy} />
               </Box>
               
               {tags.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, mb: 2 }}>
                     {tags.map((tag) => (
                        <Chip key={tag} label={tag} color="primary" />
                     ))}
                  </Box>
               )}
            </Box>

            {tasks.length > 0 ? (
               <>
                  <Accordion sx={{ width: '100%', mt: 2, mb: 2 }}>
                     <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1">Tarefas</Typography>
                     </AccordionSummary>
                  
                     <AccordionDetails>
                        <Box sx={{ 
                           maxHeight: 450, 
                           overflowY: 'auto',
                           '&::-webkit-scrollbar': {
                              width: '8px',
                           },
                           '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: '2px',
                           },
                           '&::-webkit-scrollbar-thumb:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.4)',
                           },
                           '&::-webkit-scrollbar-track': {
                              backgroundColor: 'transparent',
                           },
                           scrollbarWidth: 'thin',
                           scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
                        }}>
                           <List>
                              {tasks.map((task, index) => (
                                 <ListItem key={task.id} divider={index !== tasks.length - 1}>
                                    
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                       <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                                          <Typography component="span">
                                             {task.id}. {task.title}
                                          </Typography>
                                          <Chip 
                                             label={
                                                task.state === "Feito" ? "Feito" :
                                                task.state === "Fazendo" ? "Fazendo" :
                                                "A Fazer"
                                             }
                                             color={
                                                task.state === "Feito" ? "success" :
                                                task.state === "Fazendo" ? "info" :
                                                "default"
                                             }
                                             onClick={() => {console.log('Abrir Modal para mudar o status')}}
                                          />
                                       </Box>

                                       <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                          <Box>
                                             <Typography component="span" variant="body2">
                                                Atribuído para
                                             </Typography>
                                             <Chip
                                                sx={{ ml: 1 }}
                                                avatar={<Avatar>{task.assignedTo[0]}</Avatar>} 
                                                label={`${task.assignedTo}`}
                                                onClick={() => console.log("Selecionar usuário, ao criar a Issue vai pegar o nome que foi criado da conta do usuário")}
                                             />
                                          </Box>
                                          <Box>
                                             <IconButton onClick={() => console.log("Editar Task")}>
                                                <Edit/>
                                             </IconButton>
                                             <IconButton onClick={() => console.log("Deletar Task")}>
                                                <Delete/>
                                             </IconButton>
                                          </Box>
                                       </Box>
                                       <Typography
                                          sx={{
                                             mt: 2,
                                             color: "#b0b0b0",
                                             position: "relative",
                                             "&::before": {
                                                content: "'•'",
                                                position: "absolute",
                                                left: "-10px",
                                             }}
                                          }
                                          component="span"
                                          variant="body2"
                                       >
                                          {task.description}
                                       </Typography>
                                    </Box>

                                 </ListItem>
                              ))}
                           </List>
                        </Box>
                     </AccordionDetails>
                  </Accordion>

                  <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end"}}>
                     <Button variant="contained" startIcon={<AddCircle />}>
                        Criar Tarefa
                     </Button>
                  </Box>
               </>
            ) :  (
               <Box sx={{ mt: 2, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ mt:'5px', p: 1, border: '2px solid rgba(255, 0, 0, 0.4)', color: 'rgba(255, 0, 0, 0.7)', backgroundColor: 'rgba(255, 0, 0, 0.1)'}} variant="body2">
                     Nenhuma Tarefa criada
                  </Typography>
               
                  <Button variant="contained" startIcon={<AddCircle />}>
                     Criar Tarefa
                  </Button>
               </Box>
            )}

         </CardContent>

      </Card>
   );
};

import React, { useState } from "react";
import { 
   Card, CardContent, Typography, Chip, Box, Avatar, Button, 
   Accordion, AccordionSummary, AccordionDetails, Modal, Fade, Backdrop,
   Divider
} from "@mui/material";
import { AddCircle, ExpandMore } from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

import { ICardBacklogComponentsProps, Task } from "./CardBacklogComponents.types";

export const CardBacklogComponents = ({
   order,
   id,
   title,
   createdBy,
   state,
   tags = [],
   tasks = [],
}: ICardBacklogComponentsProps) => {
   const [open, setOpen] = useState(false);
   const [selectedTask, setSelectedTask] = useState<{ id: number; title: string; description: string, state: string;  } | Task>();

   const handleOpen = (task: any) => {
      setSelectedTask(task);
      setOpen(true);
   };

   const handleClose = () => setOpen(false);

   const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { 
         field: "title", 
         headerName: "Título", 
         flex: 1, 
         renderCell: (params) => (
            <Typography 
               variant="body2" 
               color="primary" 
               sx={{ 
                  display: 'flex', alignItems: 'center', height: '100%', width: '100%', 
                  whiteSpace: 'normal', wordBreak: 'break-word', 
                  cursor: 'pointer', textDecoration: 'none', color: '#FFF',
                  '&:hover': { color: '#1976d2', textDecoration: 'underline', transition: 'all ease-in-out .3s'}, 
               }} 
               onClick={() => handleOpen(params.row)}
            >
               {params.value}
            </Typography>
         )
      },
      { field: "assignedTo", headerName: "Atribuído Para", width: 150, renderCell: (params) => (
         <Chip avatar={<Avatar>{params.value[0]}</Avatar>} label={params.value} />
      )},
      { field: "state", headerName: "Status", width: 130, renderCell: (params) => (
         <Chip 
            label={
               params.value === "Feito" ? "Feito" :
               params.value === "Fazendo" ? "Fazendo" :
               "A Fazer"
            }
            color={
               params.value === "Feito" ? "success" :
               params.value === "Fazendo" ? "info" :
               "default"
            }
            onClick={() => {console.log('Abrir Modal para mudar o status')}}
         />
      )},
   ];


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
               <Accordion sx={{ width: '100%', mt: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                     <Typography variant="subtitle1">Tasks</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                     <Box sx={{ height: 380, width: "100%" }}>
                        <DataGrid
                           rows={tasks}
                           columns={columns}
                           pageSizeOptions={[5]}
                           initialState={{
                              pagination: {
                                 paginationModel: {
                                    pageSize: 5,
                                 },
                              },
                           }}
                           disableRowSelectionOnClick
                           disableColumnMenu
                           autoHeight
                        />
                     </Box>
                  </AccordionDetails>
               </Accordion>
            ) :  (
               <Box sx={{ mt: 2 }}>
                  <Typography sx={{ p: 0.5, backgroundColor: 'rgba(255, 0, 0, 0.1)', width: '20%', display: 'flex', justifyContent: 'center'}} variant="body2" color="error">Nenhuma task encontrada</Typography>
               </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
               <Button variant="contained" startIcon={<AddCircle />}>
                  Criar Task
               </Button>
            </Box>
         </CardContent>

         <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
         >
            <Fade in={open}>
               <Box sx={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)",
                  width: 450, 
                  bgcolor: "background.paper", 
                  boxShadow: 24, 
                  p: 3, 
                  borderRadius: 2
               }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: "rgba(255, 255, 255, 0.9)" }}>
                     ID: {selectedTask?.id}. {selectedTask?.title}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body1" sx={{ mb: 2, color: "rgba(255, 255, 255, 0.9)" }}>
                     {selectedTask?.description}
                  </Typography>

                  <Chip 
                     label={selectedTask?.state} 
                     color={selectedTask?.state === "Feito" ? "success" : selectedTask?.state === "in-progress" ? "primary" : "default"} 
                  />

                  <Button sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     width: "100%",
                     mt: 2, 
                  }} onClick={handleClose}>
                     Fechar
                  </Button>
               </Box>
            </Fade>
         </Modal>

      </Card>
   );
};

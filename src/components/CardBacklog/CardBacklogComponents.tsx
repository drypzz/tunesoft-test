import React from "react";

import {
   Card,
   CardContent,
   Typography,
   Chip,
   Box,
   Accordion,
   AccordionSummary,
   AccordionDetails,
   List,
   ListItem,
   ListItemText,
   Grid,
   Avatar,
   Button,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddCircle, ExpandMore} from "@mui/icons-material";

import { ICardBacklogComponentsProps } from "./CardBacklogComponents.types";

export const CardBacklogComponents = ({
   order,
   id,
   title,
   assignedTo,
   state,
   tags = [],
   tasks = [],
}: ICardBacklogComponentsProps) => {
   return (
      <Card sx={{ mb: 2, p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "rgba(255, 255, 255, 0.01)" }}>
         <CardContent>
            <Grid container spacing={2} alignItems="center">
               <Grid xs={12} sm={8}>
                  <Typography variant="h6">
                     {order}. {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                     ID: {id} | Atribuído para
                     <Chip 
                        sx={{ ml: 1 }}
                        avatar={
                           <Avatar>{assignedTo[0]}</Avatar>
                        } 
                        label={`${assignedTo}`} 
                        onClick={() => console.log("Selecionar usuário, ao criar a Issue vai pegar o nome que foi criado da conta do usuário")}
                     />
                  </Typography>
               </Grid>
               <Grid xs={12} sm={4} display="flex" justifyContent="flex-end">
                  <Typography component="span" variant="body1">
                     {state === "done" ? (
                        <Chip label="Done" color="success" onClick={() => console.log("Selecionar o status da Issue")} />
                     ) : state === "in-progress" ? (
                        <Chip label="In Progress" color="primary" onClick={() => console.log("Selecionar o status da Issue")} />
                     ) : (
                        <Chip label="To do" color="default" onClick={() => console.log("Selecionar o status da Issue")} />
                     )}
                  </Typography>
               </Grid>
            </Grid>
            {tags.length > 0 && (
               <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
               }}>
                  <Box mt={2} mb={2} display="flex" gap={1}>
                     {tags.map((tag) => (
                        <Chip key={tag} label={tag} color="primary" />
                     ))}
                  </Box>
                  <Box sx={{
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "flex-end",
                     mt: 2,
                  }}>
                     <Button variant="contained" startIcon={<AddCircle />} onClick={() => console.log("Criar uma nova Task")}>
                        Criar Task
                     </Button>
                  </Box>
               </Box>
            )}
            {tasks.length > 0 ? (
               <>
                  <Accordion sx={{ width: '100%'}}>
                     <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography sx={{ ml: 1 }} variant="subtitle1">Tasks</Typography>
                     </AccordionSummary>
                     <AccordionDetails sx={{ padding: 0 }}>
                        <List>
                           {tasks.map((task) => (
                              <ListItem key={task.id} divider>
                                 <ListItemText
                                    primary={
                                       <>
                                          <Typography component="span" variant="body1">
                                             {task.id}. {task.title}
                                          </Typography>
                                          <Typography sx={{ ml: 1 }} component="span" variant="body1">
                                             {task.state === "done" ? (
                                                <Chip label="Done" color="success" onClick={() => console.log("Selecionar o status da Task")} />
                                             ) : task.state === "in-progress" ? (
                                                <Chip label="In Progress" color="primary" onClick={() => console.log("Selecionar o status da Task")} />
                                             ) : (
                                                <Chip label="To do" color="default" onClick={() => console.log("Selecionar o status da Task")} />
                                             )}
                                          </Typography>

                                       </>
                                    }
                                    secondary={
                                       <>
                                          <Typography component="span" variant="body2">
                                             Atribuído para
                                             <Chip 
                                                sx={{ m: 1 }}
                                                avatar={
                                                   <Avatar>{task.assignedTo[0]}</Avatar>
                                                } 
                                                label={`${task.assignedTo}`}
                                                onClick={() => console.log("Selecionar usuário, ao criar a Issue vai pegar o nome que foi criado da conta do usuário")}
                                             />
                                          </Typography>
                                          <br />
                                          <Typography component="span" variant="body2">
                                             {task.description}
                                          </Typography>
                                       </>
                                    }
                                    />
                              </ListItem>
                           ))}
                        </List>
                     </AccordionDetails>
                  </Accordion>
               </>
            ) : (
               <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: 1,
               }}>
                  <Button variant="contained" startIcon={<AddCircle />} onClick={() => console.log("Criar uma nova Task")}>
                     Criar Task
                  </Button>
               </Box>
            )}
         </CardContent>
    </Card>
   )
}

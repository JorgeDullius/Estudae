import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ 
        ExpansionPanel, 
        ExpansionPanelSummary, 
        ExpansionPanelDetails, 
        Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import photo from '../../assets/upload__photo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(3),
        width: "95%",
    },
    '& label.Mui-focused': {
        color: '#00B36B',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#00B36B',
        },
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  image__container:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"start",
      alignItems:"center"
  },
  uploadButton: {
    marginRight: theme.spacing(1),
    backgroundColor:"#00B36B",
    maxWidth:"30%",
    minWidth:"170px",
    color:"white",
    '&:hover':{
        backgroundColor:"#00B36B",
    }
  },
  addButon: {
    backgroundColor:"#00B36B",
    color:"white",
    '&:hover':{
        backgroundColor:"#00B36B",
    }
  }
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography className={classes.heading}>Qual é a função da placa-mãe?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField variant="outlined" label="Enunciado" multiline />
                <TextField label="Alternativa 1" variant="outlined" multiline />
                <TextField label="Alternativa 2" variant="outlined"  multiline />
                <TextField label="Alternativa 3" variant="outlined"  multiline />
                <TextField label="Alternativa 4" variant="outlined"  multiline />
                <Fab size="medium" aria-label="add" className={classes.addButon}>
                    <AddIcon />
                </Fab>
            </form>
            <div className={classes.image__container}>
                <img src={photo} style={{maxWidth:"80%"}}/>
                <Fab
                    variant="contained"
                    className={classes.uploadButton}
                >
                    <CloudUploadIcon style={{marginRight:"6px"}}/>
                    Upload image
                </Fab>
            </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
import React, {Component} from 'react';
import{ 
        ExpansionPanel, 
        ExpansionPanelSummary, 
        ExpansionPanelDetails, 
        Fab,
        IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import photo from '../../assets/upload__photo.svg'

const useStyles = (theme) => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(3),
        width: "94%",
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
  addButton: {
    backgroundColor:"#00B36B",
    color:"white",
    '&:hover':{
        backgroundColor:"#00B36B",
    }
  },
  removeButton: {
    backgroundColor:"#00B36B",
    color:"white",
    '&:hover':{
        backgroundColor:"#00B36B",
    }
  },
  inputDiv: {
    display:"flex"
  },
});

class SimpleExpansionPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      questoes: [
        {
          enunciado:"enunciado 1",
          alternativas: [
            "alterntiva 1", 
            "alterntiva 2", 
            "alterntiva 3", 
            "alterntiva 4"
          ]
        },
        {
          enunciado:"enunciado 2",
          alternativas: [
            "alterntiva 1", 
           "alterntiva 2", 
            "alterntiva 3", 
            "alterntiva 4"
          ]
        },
        {
          enunciado:"enunciado 3",
          alternativas: [
            "alterntiva 1", 
            "alterntiva 2", 
            "alterntiva 3", 
            "alterntiva 4"
          ]
        }
      ]
    }
  }
  render(){
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {                
          this.state.questoes.map((item) => {
            return (
              <ExpansionPanel style={{ marginBottom:"15px"}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{item.enunciado}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <div className={classes.inputDiv}>
                        <TextField variant="outlined" label={item.enunciado} multiline />
                      </ div>
                      {
                        item.alternativas.map((alternativa)=>{
                          return (
                            <div className={classes.inputDiv}>
                              <TextField variant="outlined" label={alternativa} multiline />
                              <IconButton aria-label="delete" style={{width:"50px", height:"50px", color:"rgb(193, 47, 42)"}}>
                                <DeleteIcon />
                              </IconButton>
                            </ div> 
                          )
                        })
                      }         
                    </ div>  
                    <Fab size="medium" aria-label="add" className={classes.addButton}>
                        <AddIcon />
                    </Fab>
                  </form>
                  <div className={classes.image__container}>
                      <img src={photo} style={{maxWidth:"80%"}}/>
                      <Fab variant="contained" className={classes.uploadButton} >
                        <CloudUploadIcon style={{marginRight:"6px"}}/>
                        Upload image
                      </Fab>
                  </div>
                </ExpansionPanelDetails>            
              </ExpansionPanel>
            )
          })
        }
        <Fab
          variant="contained"
          className={classes.addButton}
          style={{display: "flex", marginTop:"10px"}}
        >
          <AddIcon style={{marginRight:"6px"}}/>
          Adicionar Questão
        </Fab>
      </div>
    );   
  }
}
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles, { withTheme: true })(SimpleExpansionPanel);
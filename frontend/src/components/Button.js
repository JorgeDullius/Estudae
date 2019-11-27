import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

const styles = {
    buttonStyle: {
        backgroundColor: "rgb(45, 158, 228);",
        '&:hover': {
          backgroundColor: "#00B2FF;",
        },
        fontFamily: 'Nunito',
        fontWeight: '900',
        fontSize: '1.7em',
        color:'white',
        textTransform: "none",
        marginTop:'20px',
    },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  if(props.type === "fab"){
    return <Fab variant = "extended" className={classes.buttonStyle}>{props.text}</Fab>;
  }
  return <Button className={classes.buttonStyle}>{props.text}</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavBar from '../Navbar';
import ExpansionPanel from '../ExpansionPanel'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    item:{
        marginLeft:theme.spacing(1),
    },
    itemName:{  
        fontFamily: 'Lato',
        fontWeight:'bold',
    },
    nested:{
        marginLeft:theme.spacing(2)
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {['Matemática', 'Português', 'Física'].map((text, index) => (
                    <ListItem button className={classes.item} key={text}>
                        <ListItemText classes={{primary:classes.itemName}} primary={text} />
                    </ListItem>
                    ))}
                    <ListItem button className={classes.item} onClick={handleClick}>
                        <ListItemText classes={{primary:classes.itemName}} primary="Programação" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Orientação a objetos" />
                        </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ExpansionPanel />
            </main>
        </div>
    );
}
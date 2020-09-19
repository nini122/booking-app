import React, { Component } from 'react';
import './admin.css';
import { TableBody, Table, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdminTable from './adminTable';
// import AdPost from './adposting';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  Table: {
    minWidth: 1080
  }
})

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverData: '',
      completed: 0
    }
  };

  // stateRefresh = () => {
  //   this.setState ({
  //     serverData: '',
  //     completed: 0
  //   })
  //   this.callApi()
  //     .then(res => this.setState({ serverData: res }))
  //     .catch(err => console.log(err));
  // }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ serverData: res }))
      .catch(err => console.log(err));
    
  }

  callApi = async () => {
    const response = await fetch('/api/api');
    const body = await response.json();
    return body;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>barname</TableCell>
                <TableCell>address</TableCell>
                <TableCell>ads</TableCell>
                <TableCell>image</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.serverData ? this.state.serverData.map(
                  c => { return (<AdminTable id={c.id} barname={c.barname} address={c.address} image={c.image} ads={c.ads} />) })
                  : ""}
            </TableBody>
          </Table>

        </Paper>
        {/* <AdPost stateRefresh={this.stateRefresh}/> */}
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
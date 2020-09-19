import React from 'react';
import { post } from 'axios';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    hidden: {
        display: "none"
    },
    menu: {
        display: 'flex',
        justifyContent: 'center'
    }
})

class AdPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barname: '',
            address: '',
            ads: '',
            file: null,
            filename: ''
        }
    }

    // stateRefresh = () => {
    //     this.setState({
    //         serverData: '',
    //         completed: 0
    //     })
    //     this.callApi()
    //         .then(res => this.setState({ serverData: res }))
    //         .catch(err => console.log(err));
    // }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addPostApi()
            .then((response) => {
                console.log(response.data);
                // this.props.stateRefresh();
            })
        this.setState({
            barname: '',
            address: '',
            ads: '',
            file: null,
            filename: ''
        })
        // window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            filename: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // send data to server api
    addPostApi = () => {
        const url = '/api/api';
        const formData = new FormData();
        formData.append('name', this.state.barname);
        formData.append('address', this.state.address);
        formData.append('ads', this.state.ads);
        formData.append('image', this.state.file);
        // formData.append('filename', this.state.filename);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.menu}>
                
                <form onSubmit={this.handleFormSubmit}>
                    <h3>Post your advertisement</h3><br />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="restaurant name"
                        name="barname"
                        value={this.state.barname}
                        onChange={this.handleValueChange}
                        multiline
                        rowsMax={4}
                        variant="outlined"
                    />
                    <br /><br />
                    <TextField
                        id="outlined-textarea"
                        label="address"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleValueChange}
                    />
                    <br /><br />
                    <TextField
                        id="outlined-multiline-static"
                        label="advertise"
                        multiline
                        rows={10}
                        variant="outlined"
                        name="ads"
                        value={this.state.ads}
                        onChange={this.handleValueChange}
                    />
                    <br />

                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.filename} onChange={this.handleFileChange} /><br />
                    <label htmlFor="raised-button-file">
                        <Button variant='contained' color='inherit' component="span" name="file">
                            {this.state.filename === "" ? "image upload" : this.state.filename}
                        </Button>
                    </label>
                    <br /><br />
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>POST</Button>
                    </DialogActions>
                </form>
            </div>

            //  Bar Name: <input type="text" name="barname" value={this.state.barname} onChange={this.handleValueChange} /><br />
            //         Address: <input type="text" name="address" value={this.state.address} onChange={this.handleValueChange} /><br />
            //         Advertisement: <input type="textarea" name="ads" value={this.state.ads} onChange={this.handleValueChange} /><br />
            // </form>
        )
    }
}

export default withStyles(styles)(AdPost);
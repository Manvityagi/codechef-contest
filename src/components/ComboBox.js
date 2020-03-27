import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

class ComboBox extends React.Component {

  state = {
    contests: []
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer baab61a4dd2e023347442f559e2542a8579e4b7c`
      }
    })
      .then(res => {
        res = res.data.result.data.content.contestList;
        this.setState({ contests: res });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err.response);
      });
  }

  render() {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={this.state.contests}
        getOptionLabel={option => `${option.code} - ${option.name}`}
        onChange={ (a,b,c) => this.props.history.push(`/contest/${b.code}`)}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />
    );
  }
}

export default ComboBox;

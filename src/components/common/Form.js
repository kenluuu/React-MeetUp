import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Form extends Component {
  state = { imgURL: null }
  onClick() {
    const input = document.getElementById('input');
    input.click();
  }
  onUpload(event) {
    const path = this.props.path;
    const file = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file[0]);
    fileReader.onload = () => {
      switch(path) {
        case "/create":
           console.log('create');
           this.props.meetupInputChange({ prop: 'img', value: file[0] });
           break;
        default:
          this.props.profileFormInputChange({ prop: 'img', value: file[0] });
          break;
      }
      this.setState({ imgURL: fileReader.result });
    };
  }
  renderImg() {
    if (this.state.imgURL) {
      return <img id="img" src={this.state.imgURL} alt="" />
    }
  }

  formatDate(data) {
    return data.toLocaleDateString(['en-US'], {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );
  }

  renderSpinner() {
    const { loading } = this.props;
    if(loading) {
      return <CircularProgress />;
    }
  }

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onClick: this.onClick.bind(this),
        onUpload: this.onUpload.bind(this),
        renderImg: this.renderImg.bind(this),
        renderSpinner: this.renderSpinner.bind(this),
        imgURL: this.state.imgURL
      })
    });
    return (
      <div>
       {childWithProp}
      </div>
    )
  }
}


export default connect(null, actions)(Form);

import React, { Component } from 'react';
import MabyEdit from 'src/index';
export default class Example extends Component {
  state = {
    value: null
  }
  onChange = ({ value }) => {
    // console.log('value---->', value);
    this.setState({ value })
  }
  handleSubmit = (value) => {
    // console.log('value---->', value);
  }
  render() {
    const { value } = this.state;
    const mabyEditProps = {
      placeholder: '输入一些文本吧',
      className: 'myEditor',
      value: value,
      mode: 'html',
      onChange: this.onChange,
      handleValue: this.handleSubmit
    };
    return (
      <div>
        <h2>测试maby-edit</h2>
        <MabyEdit {...mabyEditProps} />
      </div>
    );
  }
}
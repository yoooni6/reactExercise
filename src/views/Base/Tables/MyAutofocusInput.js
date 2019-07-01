import React from 'react'

class MyAutofocusInput extends React.Component {
    focusInput = (component) => {
      if (component) {
        component.focus();
      }
    };
  
    render() {
      return (
        <input
          ref={this.focusInput}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      );
    }
  }

  export default MyAutofocusInput
import PropTypes from 'prop-types';
import React from 'react';
import Editor from './Editor'
import './hypervisual-control.css'

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: ''
  }

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
  }

  openEditor() {
    this.setState({open: true})
  }

  closeEditor() {
    this.setState({open: false})
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const {
      forID,
      value,
      onChange,
      onOpenMediaLibrary,
      classNameWrapper,
      mediaPaths
    } = this.props;

    return (
      <div>
        <button class="open-hypervisual-editor" onClick={this.openEditor}>Edit story</button>
        <Editor 
          value={value} 
          onChange={onChange} 
          onOpenMediaLibrary={onOpenMediaLibrary}
          closeEditor={this.closeEditor} 
          mediaPaths={mediaPaths}
          open={this.state.open}/>
      </div>
    );
  }
}

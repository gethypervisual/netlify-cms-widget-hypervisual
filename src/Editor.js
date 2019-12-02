import React from 'react'
import ReactDOM from 'react-dom'
import './hypervisual-editor.css'
import CaptureKeyPress from './CaptureKeyPress'
import { Map, fromJS } from 'immutable'
import uuid from 'uuid/v4';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.controlID = uuid()
    this.el = document.createElement('div');
    this.receiveMessage = this.receiveMessage.bind(this);
    this.openMediaLibrary = this.openMediaLibrary.bind(this)
    this.editorIframeRef = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    if(window) { window.addEventListener("message", this.receiveMessage, false); }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    if(window) { window.removeEventListener("message", this.receiveMessage, false); }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.mediaPaths.get(this.controlID) !== this.props.mediaPaths.get(this.controlID)) {
      console.log(this.props.mediaPaths.get(this.controlID))
      this.editorIframeRef.current.contentWindow.postMessage({
        messageType: 'hypervisual-image-picked',
        imageSrc: this.props.mediaPaths.get(this.controlID)
      }, '*')
    }
  }

  openMediaLibrary() {
    this.props.onOpenMediaLibrary({
      controlID: this.controlID,
      forImage: true,
      privateUpload: undefined,
      value: "",
      allowMultiple: false,
      config: undefined
    })
  }

  receiveMessage(event) {

    if(event.data.messageType === 'hypervisual-ready') {
      event.source.postMessage({
        messageType: 'hypervisual-load-data',
        blocks: this.props.value ? this.props.value.get('blocks') : null,
        html: this.props.value ? this.props.value.get('html') : null
      }, '*')
    }

    if(event.data.messageType === 'hypervisual-update') {
      // We can't update with an immutable Map, as then `props.value`
      // won't be passed to the Preview component, therefore no preview
      // rerendering, due to a Netlify CMS bug
      // https://github.com/netlify/netlify-cms/issues/2150
      //console.log(event.data)
      this.props.onChange({
        blocks: JSON.stringify(event.data.blocks),
        html: `<div class="hypervisual__root">${event.data.html}</div>`
      })
    }

    if(event.data.messageType === 'hypervisual-open-image-picker') {
      this.openMediaLibrary()
    }
  }

  render() {

    let captureKeyPress = this.props.open ? (<CaptureKeyPress keyCode={27} onKeyPress={this.props.closeEditor} />) : null;

    let editorClass = `hypervisual__static-editor ${this.props.open ? "open" : "closed"}`

    let editor = (
      <div className={editorClass} onClick={this.props.closeEditor}>
        {captureKeyPress}
        <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512"  width="512px" height="512px">
          <g>
            <g>
              <polygon points="512,236.011 76.526,236.011 248.43,64.106 220.162,35.838 0,256 220.162,476.162 248.43,447.894 76.526,275.989     512,275.989   " fill="#FFFFFF"/>
            </g>
          </g>
        </svg>
        <iframe ref={this.editorIframeRef} allowTransparency="true" class="hypervisual__static-editor-iframe" src="https://hypervisual-static.test/"></iframe>
      </div>
    )

    return ReactDOM.createPortal(
      editor,
      this.el,
    );
  }
}
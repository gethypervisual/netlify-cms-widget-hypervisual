import Control from './Control'
import Preview from './Preview'
import {styles as hypervisualStyles} from '@hypervisual/assets'

if(typeof window !== 'undefined') {
  window.hypervisualControl = Control
  window.hypervisualPreview = Preview
}

const attachToCMS = function(CMS) {
  CMS.registerWidget('hypervisual', Control, Preview)
  CMS.registerPreviewStyle(hypervisualStyles, { raw: true })  
}

export default { Control, Preview, attachToCMS }



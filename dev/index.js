import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { Control, Preview } from '../src'
import { styles as hypervisualStyles } from '@hypervisual/assets'

const config = {
  backend: {
    name: 'test-repo',
    login: false,
    //name: 'github',
    //repo: 'botanicastudios/netlify-test'
  },
  media_folder: 'assets',
  collections: [{
    name: 'test',
    label: 'Test',
    files: [{
      file: 'test.json',
      name: 'test',
      label: 'Test',
      fields: [
        //{ name: 'test_widget', label: 'Test Widget', widget: 'object', fields: [{ name: 'str', label: 'Str', widget: 'string'}]},
        { name: 'content', label: 'Content', widget: 'hypervisual'}
      ],
    }],
  }],
}

CMS.registerWidget('hypervisual', Control, Preview)

CMS.registerPreviewStyle(hypervisualStyles, { raw: true })

init({ config })

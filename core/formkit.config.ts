// minimal config for Formkit
// currently required to be loaded like this...

import { loadFormkitConfig } from './utils/formkit'

const config = loadFormkitConfig({
  // custom config here
})

// Formkit expects default export of a `config` constant
// `export default loadFormkitConfig({})` does not work
export default config

'use strict'

const prettyBytes = require('pretty-bytes')
const parseDuration = require('parse-duration')

module.exports = {
  command: 'stat',

  describe: 'Get stats for the currently used repo',

  builder: {
    human: {
      type: 'boolean',
      alias: 'H',
      default: false
    },
    timeout: {
      type: 'string',
      coerce: parseDuration
    }
  },

  async handler ({ ctx: { ipfs, print }, human, timeout }) {
    const stats = await ipfs.repo.stat({
      timeout
    })

    if (human) {
      stats.numObjects = stats.numObjects.toNumber()
      stats.repoSize = prettyBytes(stats.repoSize.toNumber()).toUpperCase()
      stats.storageMax = prettyBytes(stats.storageMax.toNumber()).toUpperCase()
    }

    print(
`NumObjects: ${stats.numObjects}
RepoSize: ${stats.repoSize}
StorageMax: ${stats.storageMax}
RepoPath: ${stats.repoPath}
Version: ${stats.version}`)
  }
}

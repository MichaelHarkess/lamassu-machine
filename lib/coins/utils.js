
const coins = {
  BTC: {
    displayScale: 5,
    unitScale: 8,
    zeroConf: true
  },
  ETH: {
    displayScale: 15,
    unitScale: 18,
    zeroConf: false
  },
  ZEC: {
    displayScale: 5,
    unitScale: 8,
    zeroConf: true
  }
}

module.exports = {coins, depositUrl, parseUrl}

const plugins = {
  BTC: require('./btc'),
  ETH: require('./eth'),
  ZEC: require('./zec')
}

function depositUrl (cryptoCode, address, amountStr) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.depositUrl(address, amountStr)
}

function coinPlugin (cryptoCode) {
  const plugin = plugins[cryptoCode]
  if (!plugin) throw new Error(`Unsupported coin: ${cryptoCode}`)
  return plugin
}

function parseUrl (cryptoCode, network, url) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.parseUrl(network, url)
}
module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactAuth0',
      externals: {
        react: 'React'
      }
    }
  }
}

import * as React from 'react'
const styles = require('./App.css')

console.log("test");

const App : (() => JSX.Element) = () =>
  <div className={styles.app}>
    Hollo node 112
  </div>

export default App

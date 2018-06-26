import React from 'react'
import ReactDOM from 'react-dom'
import db from './chromeStorage.js'

const notEmpty = a => a.length > 0
const ReadingCard = ({ url, title }) => (
  <a href={url}>
    <div>
      <h1>{title}</h1>
    </div>
  </a>
)
class App extends React.Component {
  state = { readings: [] }

  set = ([key]) => val =>
    this.setState(() => ({
      [key]: val
    }))

  componentDidMount = () => this.getReadings()

  getReadings = () => db.get('readings').then(this.set`readings`)
  render() {
    const { readings } = this.state
    console.log(readings)

    return (
      <div>
        <button onClick={this.getReadings}>Refresh</button>
        {readings && notEmpty(readings) ? (
          readings.map(r => <ReadingCard key={r.url} {...r} />)
        ) : (
          <div>No readings marked yet !</div>
        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

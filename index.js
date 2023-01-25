const App = () => {
  const [quotes, setQuotes] = React.useState([])
  const [randomQuote, setRandomQuote] = React.useState('')
  const [color, setColor] = React.useState('')

  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
  ]

  const getNewQuote = () => {
    let randIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randIndex])
  }

  const getNewColor = () => {
    let randColorIndex = Math.floor(Math.random() * colors.length)
    setColor(colors[randColorIndex])
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://type.fit/api/quotes')
      const data = await response.json()

      setQuotes(data)
      let randIndex = Math.floor(Math.random() * data.length)
      let randColorIndex = Math.floor(Math.random() * colors.length)
      setRandomQuote(data[randIndex])
      setColor(colors[randColorIndex])
    }

    fetchData()
  }, [])

  return (
    <div style={{ backgroundColor: color, height: '100vh' }}>
      <div className='container p-5'>
        <div id='quote-box' className='jumbotron'>
          <div className='card'>
            <div className='card-header'>Inspirational Quotes</div>
            <div className='card-body'>
              {randomQuote ? (
                <>
                  <p id='text'>{randomQuote.text}</p>
                  <h5 id='author'>
                    - {randomQuote.author ? randomQuote.author : 'Unknown'}
                  </h5>
                </>
              ) : (
                <h3>Loading...</h3>
              )}
              <div className='row'>
                <button
                  id='new-quote'
                  className='btn btn-primary col-4'
                  onClick={() => {
                    getNewQuote()
                    getNewColor()
                  }}
                >
                  New Quote
                </button>
                <a
                  id='tweet-quote'
                  href={
                    'https://twitter.com/intent/tweet?text=' +
                    encodeURIComponent(
                      '"' +
                        randomQuote.text +
                        '"' +
                        ' ' +
                        '- ' +
                        randomQuote.author
                    )
                  }
                  target='_blank'
                  className='btn btn-warning col-2'
                >
                  <i className='fa-brands fa-twitter'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

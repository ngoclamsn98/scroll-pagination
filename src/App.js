import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onscroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        setPage(page + 1);
      }
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        if (page <= 1) {
          setPage(0)
        } else {
          setPage(page - 1);
        }
      }
      // console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight);
      // console.log(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight);
    }, 1000);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetch('https://quill-fog-route.glitch.me/dreams/' + page)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => err);
  }, [page]);

  const showText = () => {
    return data.map((item, i) => <div key={i} style={{ height: '200px' }}>{item}</div>)
  }

  const showLoading = () => {
    return loading && <div className="loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  }

  return (
    <div className="App">
      {showLoading()}
      {showText()}
    </div>
  );
}

export default App;

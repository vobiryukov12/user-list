import './App.scss';
import { Details } from './components/Details';
import { List } from './components/List';
import { IList } from './models/models';
import { useEffect, useState } from 'react';

function App() {
  const [list, setList] = useState<IList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState<IList>({
    id: 0,
    name: ''
  });
  const [filter, setFilter] = useState(0);

  async function getList() {
    try {
      setError('');
      setLoading(true); 
      const url = import.meta.env.VITE_USERS_URL;
      const response = await fetch(url);
      const data = await response.json();
      setList(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  useEffect(() => {
    getList();
  }, []);


  const handleClick = (id: number) => {
    list.forEach(item => {
      if (item.id === id) {
        setInfo(item);
        setFilter(item.id);
      }
    });
  };

  return (
    <div className='app'>
      <List list={list} 
            loading={loading} 
            error={error} 
            handleClick={handleClick} 
            selected={filter}
      />

      { info.id !== 0 && <Details info={info} /> }
    </div>
  );
}

export default App;

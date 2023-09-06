import './App.scss';
import { Details } from './components/Details';
import { List } from './components/List';
import { IList } from './models/models';
import { useState } from 'react';
import useJsonFetch from './hooks/useJsonFetch';

function App() {
  const [data, loading, error] = useJsonFetch(import.meta.env.VITE_USERS_URL);
  const [info, setInfo] = useState<IList>({
    id: 0,
    name: ''
  });
  const [filter, setFilter] = useState(0);

  const handleClick = (id: number) => {
    data.forEach(item => {
      if (item.id === id) {
        setInfo(item);
        setFilter(item.id);
      }
    });
  };

  return (
    <div className='app'>
      <List list={data} 
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

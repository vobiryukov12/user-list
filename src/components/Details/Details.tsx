import { useEffect, useState } from 'react';
import './Details.scss';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { IList, IUser } from '../../models/models';

interface IDetailsProps {
  info: IList
}

export function Details({ info }: IDetailsProps) {
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: '',
    avatar: '',
    details: {
      city: '',
      company: '',
      position: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    async function getInfo() {
      try {
        setError('');
        setLoading(true);
        const url = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`;
        const response = await fetch(url);
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        const error = new Error(" Ого, ошибка! o_O");
        setError(error.message);
      }
    }
    
    getInfo();
  }, [info]);
  
  return (
    <div className='details'>
      {
        loading === false && error === ''
        ? <div className='details__content'>
            <img className='details__img' key={info.id} src={user.avatar} alt="Avatar" width={300} height={300}/>
            <div className="details__list">
              <div className='details__item details__name'>{user.name}</div>
              <div className='details__item details__city'>City: {user.details.city}</div>
              <div className='details__item details__company'>Company: {user.details.company}</div>
              <div className='details__item details__position'>Position: {user.details.position}</div>
            </div>
          </div>
        : <div className="details__message">
            { loading && <Loader /> }
            { error && <ErrorMessage error={error}/> }
          </div>
      }
    </div>
  );
}

import { IList } from '../../models/models';
import { ErrorMessage } from '../ErrorMessage';
import { ListItem } from '../ListItem';
import { Loader } from '../Loader';
import './List.scss';

interface IListProps {
  list: IList[], 
  loading: boolean, 
  error: string, 
  handleClick: (id: number) => void, 
  selected: number
}

export function List({ list, loading, error, handleClick, selected }: IListProps) {
  return (
    <ul className='list'>
      { loading === false && error === '' ? list.map(item => <ListItem key={item.id} id={item.id} name={item.name} handleClick={handleClick} selected={selected} />) 
      : <div className="list__message">
          { loading && <Loader /> }
          { error && <ErrorMessage error={error}/> }
        </div>
      }
    </ul>
  );
}

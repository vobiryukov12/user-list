interface IListItemProps {
  name: string, 
  id: number, 
  handleClick: (id: number) => void,
  selected: number
}

export function ListItem({ name, id, handleClick, selected }: IListItemProps) {
  return (
    <li className={`list__item ${selected === id ? 'list__item--active' : ''}`} 
        onClick={() => handleClick(id)}
    >
      {name}
    </li>
  );
}

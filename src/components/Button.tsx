import { FC } from 'react';
import './button.scss';

type Props = {
  name: string,
  onClick: () => void,
  isDisabled?: boolean,
}

const Button:FC<Props> = ({ name, onClick, isDisabled }) => (
  <div>
    <button className="button" onClick={onClick} disabled={isDisabled}>{name}</button>
  </div>
);

export default Button;

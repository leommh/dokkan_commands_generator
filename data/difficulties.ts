import { Difficulty } from '../helpers/interfaces';

const difficulties:Array<Difficulty> = [
  {
    name: 'All',
    value: -1,
    class: 'recommended',
  },
  {
    name: 'Hardest stage',
    value: -2,
    class: 'recommended',
  },
  {
    name: 'Normal',
    value: 0,
    class: '',
  },
  {
    name: 'Hard',
    value: 1,
    class: '',
  },
  {
    name: 'Z-Hard',
    value: 2,
    class: '',
  },
  {
    name: 'Super',
    value: 3,
    class: '',
  },
  {
    name: 'Super 2',
    value: 4,
    class: '',
  },
  {
    name: 'Super 3',
    value: 5,
    class: '',
  }
];

export default difficulties;
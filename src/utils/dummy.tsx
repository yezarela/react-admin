import format from 'date-fns/format';

export const generateData = keys => {
  const words = ['Rock', 'Paper', 'Scissors'];
  const rand = () => Math.floor(Math.random() * 3);

  const createData = i => {
    return keys
      .map(k => ({ [k]: k === 'created_at' ? format(new Date(), 'MMMM DD, YYYY') : words[rand()] }))
      .reduce((a, b) => ({ ...b, ...a }), { id: i });
  };

  return [...Array(30).keys()].map(x => createData(x));
};

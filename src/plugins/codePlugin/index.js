import renderMark from '../../components/renderMark';
import opts from '../../options';

const { MARKS } = opts;
export default (opt) => {
  const options = Object.assign({
    type: MARKS.CODE
  }, opt);
  return renderMark(options, 'mod+`');
};
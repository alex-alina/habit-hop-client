import icons from '../utils/icons';
import Svg from '../core-components/Svg';

const SvgIcon = ({ name, ...props }) => {
  if (!Object.hasOwn(icons, name)) {
    throw new Error('this icon name does not exist');
  }
  return <Svg name={icons[name]} {...props} />;
};

export default SvgIcon;

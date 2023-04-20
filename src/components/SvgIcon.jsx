import icons from '../utils/icons';
import Svg from '../core-components/Svg';

const SvgIcon = ({ name, ...props }) => {
  if (!Object.hasOwn(icons, name)) {
    return null;
  }
  return <Svg paths={icons[name]} name={name} {...props} />;
};

export default SvgIcon;

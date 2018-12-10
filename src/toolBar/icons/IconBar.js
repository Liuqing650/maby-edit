import React from 'react';
import QuillIcons from 'quill-icons';

class IconBar extends React.Component {
  render() {
    const {
      type,
      icon,
      isActive,
      className = 'icon-item',
      activeClassName = 'icon-active',
      activeStrokeClassName = 'icon-stroke-active',
      strokeClassName = 'icon-stroke',
      activeFillClassName = 'icon-fill-active',
      fillClassName = 'icon-fill',
    } = this.props;
    const iconClassName = isActive ? activeClassName : className;
    const iconFillClassName = isActive ? activeFillClassName : fillClassName;
    const iconStrokeClassName = isActive ? activeStrokeClassName : strokeClassName;
    const fontElement = React.createElement(
      QuillIcons[icon],
      Object.assign({
        className: iconClassName,
        strokeClassName: iconStrokeClassName,
        fillClassName: iconFillClassName,
      })
    );
    return (
      <span
        key={`${type}-${icon}`}
        data-active={isActive || false}
      >
        {fontElement}
      </span>
    );
  }
}
export default IconBar;
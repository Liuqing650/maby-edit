import React from 'react';
import IconBar from '../IconBar';
import { haveBlocks } from '../../../utils';
import { onInsertHr, unWrapHr } from '../../../plugins/hrPlugin';

class HrIcon extends React.Component {
  onMouseDown = (event) => {
    event.preventDefault();
    const { change, item, onChange } = this.props;
    const isActive = haveBlocks(change, item.type);
    if (onChange && typeof onChange === 'function') {
      if (isActive) {
        onChange(unWrapHr(event, change, item));
      } else {
        onChange(onInsertHr(event, change, item));
      }
    }
  }
  render() {
    const { change, item } = this.props;
    const isActive = haveBlocks(change, item.type);
    const iconProps = {
      className: 'icon-box',
      title: item.title,
      onMouseDown: this.onMouseDown
    };
    const iconBarProps = {
      type: item.type,
      icon: item.icon,
      isActive
    };
    return (
      <div {...iconProps}>
        <IconBar {...iconBarProps} />
      </div>
    );
  }
}
export default HrIcon;
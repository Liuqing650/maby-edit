import Html from 'slate-html-serializer';
import { getEventTransfer } from 'slate-react';
import { DEFAULT_RULES } from '../../common/rules';

const serializer = new Html({ rules: DEFAULT_RULES });

export default () => {
  return {
    /**
     * On paste, deserialize the HTML and then insert the fragment.
     *
     * @param {Event} event
     * @param {Change} change
     */

    onPaste: (event, change, next) => {
      const transfer = getEventTransfer(event);
      if (transfer.type !== 'html') {
        return next();
      }
      const { document } = serializer.deserialize(transfer.html);
      change.insertFragment(document);
      return true;
    }
  };
};
// @flow
import { Mark, Range } from "slate";
import trailingSpace from "../../helper/trailingSpace";
import removeAllMark from "../../helper/mark-removeall";

export default function(type, currentTextNode, matched, change) {
  const matchedLength = matched[0].length;
  const addText = matched[0].trim().replace(new RegExp(matched[1], "g"), "");

  return change
    .deleteAtRange(
      Range.create({
        anchorKey: currentTextNode.key,
        focusKey: currentTextNode.key,
        anchorOffset: matched.index,
        focusOffset: matched.index + matchedLength
      })
    )
    .insertTextByKey(currentTextNode.key, matched.index, addText, [
      Mark.create({ type })
    ])
    .call(trailingSpace, currentTextNode, matched.index)
    .call(removeAllMark);
}

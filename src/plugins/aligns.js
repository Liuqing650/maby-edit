import { NODE_DATA_INVALID } from 'slate-schema-violations';
import PluginEditTable from 'slate-edit-table';
import DICT from '../static';

/* https://github.com/GitbookIO/slate-edit-table */
const tablePlugin = PluginEditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
});
function setColumnAlign(change, align) {
  const pos = tablePlugin.utils.getPosition(change.value);
  const columnCells = tablePlugin.utils.getCellsAtColumn(
    pos.table,
    pos.getColumnIndex()
  );
  columnCells.forEach(cell => {
    change.setNodeByKey(cell.key, { data: { align } });
  });
  return change;
}

const alignPlugin = {
  schema: {
    blocks: {
      table_cell: {
        data: {
          // Make sure cells have an alignment
          align: align => ['left', 'center', 'right'].includes(align)
        },
        normalize(change, violation, context) {
          if (violation === NODE_DATA_INVALID) {
            change.setNodeByKey(context.node.key, {
              data: context.node.data.set('align', DICT.TABLE_TEXT_ALIGIN)
            });
          }
        }
      }
    }
  },
  changes: {
    setColumnAlign
  }
};

export default alignPlugin;
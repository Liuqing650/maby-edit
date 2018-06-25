function dedentLines(opts, change, indent) {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((c, line) => {
        // Remove a level of indent from the start of line
        const text = line.nodes.first();
        const lengthToRemove = text.characters
            .takeWhile((char, index) => indent.charAt(index) === char.text)
            .count();
        return c.removeTextByKey(text.key, 0, lengthToRemove);
    }, change);
}

export default dedentLines;
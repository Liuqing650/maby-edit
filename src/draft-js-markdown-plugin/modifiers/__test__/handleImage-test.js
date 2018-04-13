import Draft, { EditorState, SelectionState } from "draft-js";
import handleImage from "../handleImage";

describe("handleImage", () => {
  let beforeRawContentState;
  let afterRawContentState;
  let selection;
  let fakeInsertImage;

  afterAll(() => {
    handleImage.__ResetDependency__("insertImage"); // eslint-disable-line no-underscore-dangle
  });

  const createEditorState = text => {
    afterRawContentState = {
      entityMap: {},
      blocks: [
        {
          key: "item1",
          text: "Test",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };

    beforeRawContentState = {
      entityMap: {},
      blocks: [
        {
          key: "item1",
          text,
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };

    selection = new SelectionState({
      anchorKey: "item1",
      anchorOffset: text.length - 1,
      focusKey: "item1",
      focusOffset: text.length - 1,
      isBackward: false,
      hasFocus: true,
    });

    const contentState = Draft.convertFromRaw(beforeRawContentState);
    const editorState = EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
    const newContentState = Draft.convertFromRaw(afterRawContentState);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-image"
    );

    fakeInsertImage = jest.fn(() => newEditorState);

    handleImage.__Rewire__("insertImage", fakeInsertImage); // eslint-disable-line no-underscore-dangle

    return editorState;
  };

  [
    [
      "if matches src only",
      "![](http://cultofthepartyparrot.com/parrots/aussieparrot.gif)",
    ],
    [
      "if matches src and alt",
      "![alt](http://cultofthepartyparrot.com/parrots/aussieparrot.gif)",
    ],
    [
      "if matches src, alt and title",
      '![alt](http://cultofthepartyparrot.com/parrots/aussieparrot.gif "party")',
    ],
  ].forEach(([condition, text]) => {
    describe(condition, () => {
      it("returns new editor state", () => {
        const editorState = createEditorState(text);
        const newEditorState = handleImage(editorState, " ");
        expect(newEditorState).not.toEqual(editorState);
        expect(Draft.convertToRaw(newEditorState.getCurrentContent())).toEqual(
          afterRawContentState
        );
        expect(fakeInsertImage).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe("if does not match", () => {
    it("returns old editor state", () => {
      const editorState = createEditorState("yo");
      const newEditorState = handleImage(editorState, " ");
      expect(newEditorState).toEqual(editorState);
      expect(fakeInsertImage).not.toHaveBeenCalled();
    });
  });
});

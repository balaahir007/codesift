import React, { useEffect, useMemo, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { customTheme } from "../extension/theme";
import { getLanguageExtension } from "../extension/language-extension";
import { minimap } from "../extension/minimap";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { customSetup } from "../extension/custom-setup";
import { suggestion } from "../extension/suggestion";
import { quickEdit } from "../extension/quick-edit";
import { selectionTooltip } from "../extension/selection-tolltip";

interface Props {
  filename: string;
  initialValue? : string,
  onChange : (value : string)=> void;
}
const CodeEditor = ({ filename,initialValue = "",onChange }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const languageExtension = useMemo(
    () => getLanguageExtension(filename),
    [filename],
  );
  useEffect(() => {
    if (!editorRef.current) return;
    const view = new EditorView({
      doc:initialValue,
      parent: editorRef.current,
      extensions: [
        customSetup,
        customTheme,
        oneDark,
        suggestion(filename),
        selectionTooltip(),
        quickEdit(filename),
        languageExtension,
        keymap.of([indentWithTab]),
        minimap(),
        indentationMarkers(),
        EditorView.updateListener.of((update)=>{
          if(update.docChanged){
            onChange(update.state.doc.toString())
          }
        })
      ],
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };



  }, [languageExtension]);
  return (
    <div
      ref={editorRef}
      className=" h-full w-full size-full pl-4 bg-background "
    ></div>
  );
};

export default CodeEditor;

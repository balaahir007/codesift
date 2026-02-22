import { EditorView,Tooltip,showTooltip } from "@codemirror/view";
import { StateField, StateEffect, EditorState } from "@codemirror/state";
import {showQuickEditEffect,quickEditState} from './quick-edit'
import { stat } from "fs";

let editorView: EditorView | null = null;
const createTooltipForSelection = (state: EditorState): readonly Tooltip[] => {
    const selection = state.selection.main;
    if (selection.empty) {
        return [];
    }
    const isQuickEditActive = state.field(quickEditState)
    if (isQuickEditActive) return []
    return [
        {
            pos: selection.to,
            above: false,
            strictSide: false,
            create() {
                const dom = document.createElement("div")
                dom.className = "bg-popover-foreground z-50 rounded-sm border border-input p-2 shadow-md flex flex-col gap-2 text-sm ";
                const addToChatButton = document.createElement("button")
                addToChatButton.textContent = "Add to Chat"
                addToChatButton.className = "font-sans p-1 px-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-sm"
                
                const quickEditButton = document.createElement("button")
                quickEditButton.textContent = "Quick Edit"
                quickEditButton.className = "font-sans p-1 px-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-sm"

                const quickEdiEditButtonText = document.createElement("span")
                quickEdiEditButtonText.textContent = "Quick Edit"

                const quickEditButtonShortcut = document.createElement("span")
                quickEditButtonShortcut.textContent = "Ctrl + K"
                quickEditButtonShortcut.className = "text-xs text-muted-foreground"

                quickEditButton.appendChild(quickEdiEditButtonText)
                quickEditButton.appendChild(quickEditButtonShortcut)

                quickEditButton.onclick = () => {
                    if (!editorView) return;
                    editorView.dispatch({
                        effects: showQuickEditEffect.of(true)
                    })
                }
                dom.appendChild(addToChatButton)
                dom.appendChild(quickEditButton)
                return { dom }
            }

        }
    ]
}

const selectionTooltipField = StateField.define<readonly Tooltip[]>({
    create(state) {
        return createTooltipForSelection(state);
    },
    update(tooltips, transaction) {
        if(transaction.docChanged || transaction.selection){
            return createTooltipForSelection(transaction.state)
        }
        for (const effect of transaction.effects) {
            if (effect.is(showQuickEditEffect)) {
                return createTooltipForSelection(transaction.state)
            }

        }
        return tooltips;
    },
    provide : (field) => {
        return showTooltip.computeN([field], (state) => state.field(field))
    },
})
const captureViewExtension = EditorView.updateListener.of((update)=>{
    editorView = update.view
}
)
export const selectionTooltip = () => [
    selectionTooltipField,
    captureViewExtension
]
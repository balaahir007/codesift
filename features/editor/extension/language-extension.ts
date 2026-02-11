import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { Extension } from '@codemirror/state'

const languageMap: Record<string, any> = {
    js: javascript({ typescript: true }),
    ts: javascript({ typescript: true }),
    jsx: javascript({ jsx: true }),
    tsx: javascript({ jsx: true, typescript: true }),
    html: html(),
    css: css(),
    json: json(),
    py: python(),
    java: java(),
    c: cpp(),
    cpp: cpp(),
    sql: sql(),
    md: markdown(),
    php: php(),
    rs: rust(),
    go: go(),
};


export const getLanguageExtension = (fileName?: string): Extension => {
    if (!fileName) return javascript();
    const ext = fileName.split(".").pop()?.toLowerCase();
    return languageMap[ext!] || javascript()
}
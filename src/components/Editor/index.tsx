"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";
import React from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import {
  RxCode,
  RxStrikethrough,
  RxFontBold,
  RxFontItalic,
  RxChevronDown,
  RxChatBubble,
} from "react-icons/rx";
import BubbleButton from "./BubbleButton";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content:
      "<pre><code class='language-javascript'>console.log('asd')</code><pre>",
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent
        className="max-w-[700px] w-full mx-auto pt-16"
        editor={editor}
      />

      {editor && (
        <BubbleMenu
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
          editor={editor}
        >
          <BubbleButton>
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>

          <BubbleButton>
            Comment
            <RxChatBubble className="w-4 h-4" />
          </BubbleButton>

          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <RxFontBold className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <RxFontItalic className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <RxStrikethrough className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive("strike")}
            >
              <RxCode className="w-4 h-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  );
}

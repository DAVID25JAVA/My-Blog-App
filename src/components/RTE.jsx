import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {label && (
        <label className="block mb-2 text-lg font-bold text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey="x4tihygda7nam4cbor0g4c3t0zzwwopjw249tzg4pkj2n07p"
            init={{
              height: 500,
              menubar: true,
              readonly: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        )}
      />
    </div>
  );
}

export default RTE;
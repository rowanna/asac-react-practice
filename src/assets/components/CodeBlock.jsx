import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlockComponent = ({ code }) => {
  return (
    <>
      <div className="w-full">
        <div className="bg-blue-100 w-full h-9 rounded-t-lg px-4 py-2 text-sm text-gray-500 font-medium">
          index.js
        </div>
        <div className="bg-blue-50 w-full h-20 rounded-b-lg px-4 py-2 text-sm text-gray-800 font-medium">
          <SyntaxHighlighter language={"javascript"} style={solarizedlight}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};

export default CodeBlockComponent;

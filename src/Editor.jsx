import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const Editor = ({currentNote, updateNote}) =>{
    const [selectedTab, setSelectedTab] = React.useState("write")

    return(
        <ReactMde
            className="editor"
            value={currentNote.body}
            onChange={updateNote}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
            }
        />
    )
}

export default Editor
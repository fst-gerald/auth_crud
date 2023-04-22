import React from "react";
import { Content } from "../../models/Content";
import ContentListItem from "./ContentListItem";


interface Props {
  contents: Content[];
  onDelete: (content: Content) => void;
}

const ContentList: React.FC<Props> = ({ contents, onDelete}) => {
  return (
    <ul className="paddingLeftTodo">
        {contents.map(content => (
            <ContentListItem key={content.id} content={content} onDelete={onDelete}/>
        ))}
    </ul>
    );
};

export default ContentList;
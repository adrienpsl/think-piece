import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Comments = ( { comments, onCreate } ) => {
	return (
			<section className="Comments">
				<AddComment onCreate={ onCreate }/>
				{ comments.map( comment => <Comment { ...comment }
																						key={ comment.id }/> ) }
			</section>
	);
};

export default Comments;

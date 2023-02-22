import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
	return (
		<div className="search">
			<form>
				<SearchIcon className="icon" />
				<input
					placeholder="Search by name"
					value={props.search}
					onChange={props.onChange}
					type="text"
				/>
			</form>
		</div>
	);
};

export default Search;

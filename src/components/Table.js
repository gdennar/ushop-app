import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "rgba(4, 20, 42, 0.937)",
		color: "#ffb700",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function Tables(props) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">s/n</StyledTableCell>
						<StyledTableCell align="center">Image</StyledTableCell>
						<StyledTableCell align="center">Name</StyledTableCell>
						<StyledTableCell align="center">Category</StyledTableCell>
						<StyledTableCell align="center">Price</StyledTableCell>
						<StyledTableCell align="center">Actions</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.data.map((product, index) => (
						<StyledTableRow key={product.id}>
							<StyledTableCell align="center">{index + 1}</StyledTableCell>
							<StyledTableCell align="center">
								<img
									src={product.imageUrl}
									alt={product.name}
									style={{ width: "100px" }}
								/>
							</StyledTableCell>
							<StyledTableCell align="center">{product.name}</StyledTableCell>
							<StyledTableCell align="center">
								{product.category}
							</StyledTableCell>
							<StyledTableCell align="center">
								&#8358;{` ${product.price}`}
							</StyledTableCell>
							<StyledTableCell align="center">
								<Link to={`/admin/add-product/${product.id}`}>
									<Edit
										sx={{ color: "rgba(4, 20, 42, 0.937)" }}
										//onClick={() => props.onEdit(product.id)}
									/>
								</Link>
								<DeleteForever
									sx={{ color: "red" }}
									onClick={() => props.onDelete(product.id, product.imageUrl)}
								/>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

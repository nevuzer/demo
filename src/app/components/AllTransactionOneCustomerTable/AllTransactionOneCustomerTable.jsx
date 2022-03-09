import PropTypes from "prop-types";
import { format } from "date-fns";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import styles from "../PurchasesDetailsByCustomerTable/PurchasesDetailsByCustomerTable.module.css";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { calculatePoints } from "app/shared/functions/calculatePoints";

export const AllTransactionOneCustomerTable = (props) => {
  const { purchases } = props;

  return (
    <TableContainer component={Paper} className={styles.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {format(new Date(row.date), "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{calculatePoints(row.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AllTransactionOneCustomerTable.propTypes = {
  purchases: PropTypes.array.isRequired,
};

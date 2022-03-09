import { format, subMonths } from "date-fns";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { getThreeMonthsDetails } from "app/shared/functions/purchases";
import styles from "./PurchasesDetailsByCustomerTable.module.css";

export const PurchasesDetailsByCustomerTable = (props) => {
  const { data } = props;

  const getMonthName = (months) =>
    format(subMonths(new Date(), months || 0), "MMMM");

  const cellRender = (cellData) => {
    return (
      <div>
        <div className={styles.cellRow}>
          <span>Transactions:</span> <span>{cellData.transactions}</span>
        </div>
        <div className={styles.cellRow}>
          <span>Sum:</span> <span>{cellData.sum.toFixed(2)}</span>
        </div>
        <div className={styles.cellRow}>
          <span>Points:</span>{" "}
          <span className={styles.bold}>{cellData.points}</span>
        </div>
      </div>
    );
  };

  return (
    <TableContainer component={Paper} className={styles.root}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align="right">{getMonthName()}</TableCell>
            <TableCell align="right">{getMonthName(1)}</TableCell>
            <TableCell align="right">{getMonthName(2)}</TableCell>
            <TableCell align="right">All</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.customerId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customer}
              </TableCell>
              <TableCell align="right">{cellRender(row.month1)}</TableCell>
              <TableCell align="right">{cellRender(row.month2)}</TableCell>
              <TableCell align="right">{cellRender(row.month3)}</TableCell>
              <TableCell align="right">
                {cellRender(getThreeMonthsDetails(row))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PurchasesDetailsByCustomerTable.propTypes = {
  data: PropTypes.array.isRequired,
};

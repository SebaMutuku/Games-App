import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
interface GamesData {
  id?: "";
  title: "";
  platform: "";
  score: 0.0;
  genre: "";
  editors_choice: "";
}

function App() {
  const [data, setData] = useState<GamesData[]>([]);
  useEffect(() => {
    loadGamesData();
  }, []);
  const loadGamesData = () => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((responseData) => {
        let responseArray: Array<any> = Object.entries(responseData);
        let dataArray: any = [];
        responseArray.forEach((item) => {
          if (item[0] !== 0) dataArray.push(item[1]);
        });

        setData(dataArray);
      });
  };
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650, width: "100%" }}
        size="medium"
        aria-label="Games Information"
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Editors Choice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: GamesData) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.platform}</TableCell>
              <TableCell align="right">{item.score}</TableCell>
              <TableCell align="right">{item.genre}</TableCell>
              <TableCell align="right">{item.editors_choice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;

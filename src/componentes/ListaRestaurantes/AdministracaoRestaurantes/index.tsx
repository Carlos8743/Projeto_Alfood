import axios from "axios"
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante";
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const AdministracaoRestaurantes = ()=> {
    const [restaurante, setRestaurantes] = useState<IRestaurante[]>([]);
    useEffect(() => {
            axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/").then(resposta => setRestaurantes(resposta.data)).then(a => console.log(a));
        }
    , []);
    return (
        <TableContainer>
                <Table>
                    <TableHead>
                        {restaurante.map((rest) => {
                        <TableRow>
                            <TableCell>
                                {rest.nome}
                            </TableCell>
                        </TableRow>
                        })}
                    </TableHead>
                </Table>
        </TableContainer>
    );

}
export {AdministracaoRestaurantes};
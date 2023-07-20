import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface TableProps {
    data: any[]; // Pass an array of objects for the table data
    columns: string[]; // Pass an array of strings for the column names
}

const Tables: React.FC<TableProps> = ({ data, columns }) => {
    const getValue = (row: any, key: string): string => {
        const keys = key.split('.');
        let value = row;
        for (const k of keys) {
            if (value && k in value) {
                value = value[k];
            } else {
                return '';
            }
        }
        return value.toString();
    };

    return (
        <TableContainer sx={{ color: 'white', backgroundColor: 'white' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>{getValue(row, column)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Tables;

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ size = 50 }) {
    return (
        <div>
            <CircularProgress color="inherit" size={size} />
        </div>
    );
}

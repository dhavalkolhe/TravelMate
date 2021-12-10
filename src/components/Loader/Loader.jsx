import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ size = 50 }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: "grid", placeItems: "center"
        }}>
            <CircularProgress color="inherit" size={size} />
        </div>
    );
}

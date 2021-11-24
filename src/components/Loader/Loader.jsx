import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: "grid", placeItems: "center"
        }}>
            <CircularProgress sx={{ color: '#001963' }} />
        </div>
    );
}

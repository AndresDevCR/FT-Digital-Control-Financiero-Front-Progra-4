import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import { UploadIllustration } from '../../assets/illustrations';

export default function DropZone(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <UploadIllustration
                    sx={{
                        width: 240,
                        height: 240,
                        opacity: 0.48,
                        filter: (theme) => theme.palette.mode === 'light' ? 'grayscale(1)' : 'none',
                        mx: 'auto',
                        mb: 3
                    }}
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Arrastra y suelta los archivos aquí
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    o haz clic para seleccionar archivos
                </Typography>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}
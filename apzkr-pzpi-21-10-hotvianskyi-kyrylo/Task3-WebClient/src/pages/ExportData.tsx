import {Alert, Box, Button, Container, Paper, Snackbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth.ts";
import {dataExportService} from "../features/dataExportService.ts";

export function ExportData() {
    const { t } = useTranslation();
    const { auth } = useAuth();

    const handleExport = async () => {
        try {
            const xlsx : Blob = await dataExportService.exportData(auth.bearer!);
            const blob = new Blob([xlsx], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.download = 'data.xlsx';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error('Error fetching pools:', error);
        }
    }

    return (
        <Container>
            <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                {t('exportData')}
            </Typography>

            <Paper elevation={3} style={{ padding: '20px', paddingBottom: '20px' }}>
                <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleExport}>
                        {t('exportData')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
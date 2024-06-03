import {
    Box,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth.ts";
import InfoIcon from '@mui/icons-material/Info';
import {useEffect, useState} from "react";
import {measurementsService} from "../features/measurementsService.ts";
import {MeasurementDto} from "../interfaces/measurement.ts";
import {RecommendationDto} from "../interfaces/recommendation.ts";

export default function Measurements() {
    const { t } = useTranslation();
    const { auth } = useAuth();
    const [measurements, setMeasurements] = useState<MeasurementDto[]>();
    const [recommendations, setRecommendations] = useState<RecommendationDto[]>()

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                const response = await measurementsService.getAllMeasurementsByMember(auth.bearer!);
                setMeasurements(response);
            } catch (error) {
                console.error('Error fetching pools:', error);
            }
        };
        fetchMeasurements();
    }, [auth.bearer]);

    const handleGetRecomendation = async (measurementId: number) => {
        try {
            const recommendations : RecommendationDto[] = await measurementsService.getRecommendationByIdForMember(auth.bearer!, measurementId);
            setRecommendations(recommendations)
        } catch (error) {
            console.error('Error fetching pools:', error);
        }
    }

    return (
        <Container>
            <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                {t('measurements')}
            </Typography>

            <Paper elevation={3} style={{ padding: '20px', paddingBottom: '20px' }}>
                {measurements?.length === 0 && (
                    <>
                        <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                            {t('noMeasurements')}
                        </Typography>
                        <Typography variant="h6" gutterBottom align="center" mt={3} mb={2}>
                            {t('makeOneMeasurement')}
                        </Typography>
                    </>)}
                <Table sx={{ mb: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('date')}</TableCell>
                            <TableCell>{t('height')}</TableCell>
                            <TableCell>{t('weight')}</TableCell>
                            <TableCell>{t('fatPercentage')}</TableCell>
                            <TableCell>{t('musclePercentage')}</TableCell>
                            <TableCell>{t('pressure')}</TableCell>
                            <TableCell>{t('bmi')}</TableCell>
                            <TableCell>{t('levelOfStress')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {measurements?.map((measurement, index) => {
                                const date = new Date(measurement.dateAndTime);
                                const dataParseOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                                return <TableRow key={index}>
                                    <TableCell>{new Intl.DateTimeFormat('en-US', dataParseOptions).format(date)}</TableCell>
                                    <TableCell>{measurement.height}</TableCell>
                                    <TableCell>{measurement.weight}</TableCell>
                                    <TableCell>{measurement.fatPercentage}</TableCell>
                                    <TableCell>{measurement.musclePercentage}</TableCell>
                                    <TableCell>{`${measurement.upperPressure}/${measurement.lowerPressure}`}</TableCell>
                                    <TableCell>{measurement.bodyMassIndex}</TableCell>
                                    <TableCell>{measurement.levelOfStress}</TableCell>
                                    <TableCell>
                                        <Box display="flex" flexDirection="row">
                                            <IconButton
                                                color="primary"
                                                aria-label={t('addToCart')}
                                                onClick={() =>
                                                    handleGetRecomendation(
                                                        measurement.id
                                                    )
                                                }
                                            >
                                                <InfoIcon/>
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            }
                        )}
                    </TableBody>
                </Table>

                <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                    {recommendations && recommendations.map((recommendation) => {
                            return (
                                <Typography variant="h6" gutterBottom align="center" mt={3} mb={2}>
                                    {t(recommendation.key)}
                                </Typography>
                            )
                        })
                    }
                </Typography>
            </Paper>
        </Container>
    )
}
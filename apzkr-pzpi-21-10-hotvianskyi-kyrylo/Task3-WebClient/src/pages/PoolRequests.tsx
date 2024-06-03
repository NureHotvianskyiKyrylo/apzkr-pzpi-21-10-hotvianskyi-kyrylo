import {
    Container,
    Paper,
    Typography,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Box,
    IconButton
} from "@mui/material";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {poolsService} from "../features/poolsService.ts";
import {PoolEnrollmentDto} from "../interfaces/poolEnrollment.ts";
import {membersService} from "../features/membersService.ts";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function PoolRequests() {
    const { t } = useTranslation();
    const { auth } = useAuth();

    const [poolRequests, setPoolRequests] = useState<PoolEnrollmentDto[]>()

    useEffect(() => {
        const fetchPoolRequests = async () => {
            try {
                const response = await poolsService.getAllPoolRequests(auth.bearer!);
                setPoolRequests(response);
            } catch (error) {
                console.error('Error fetching pools:', error);
            }
        };
        fetchPoolRequests();
    }, [auth.bearer]);

    const handleAccept = async (poolRequestsId: number, memberId: number, poolId: number) => {
        try {
            await membersService.enrollMemberToPool(auth.bearer!, memberId, poolId);
            await poolsService.deletePoolEnrollment(auth.bearer!, poolRequestsId);
            setPoolRequests((old) => old!.filter((poolRequest) => poolRequest.id !== poolRequestsId));
        } catch (error) {
            console.error('Error fetching pools:', error);
        }
    }

    const handleDecline = async (poolRequestsId: number)=> {
        try {
            await poolsService.deletePoolEnrollment(auth.bearer!, poolRequestsId);
            setPoolRequests((old) => old!.filter((poolRequest) => poolRequest.id !== poolRequestsId));
        } catch (error) {
            console.error('Error fetching pools:', error);
        }
    }

    if (!poolRequests || poolRequests.length === 0) {
        return (
            <Container>
                <Typography variant="h5" gutterBottom align="center" mt={4}>
                    {t('emptyPoolRequests')}
                </Typography>
            </Container>
        );
    }

    return <Container>
        <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
            {t('poolRequests')}
        </Typography>

        <Paper elevation={3} style={{ padding: '20px', paddingBottom: '20px' }}>
            <Table sx={{ mb: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('firstName')}</TableCell>
                        <TableCell>{t('lastName')}</TableCell>
                        <TableCell>{t('poolName')}</TableCell>
                        <TableCell>{t('poolAddress')}</TableCell>
                        <TableCell>{t('poolCity')}</TableCell>
                        <TableCell>{t('poolCountry')}</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {poolRequests?.map((poolRequest) => (
                        <TableRow key={poolRequest.id}>
                            <TableCell>{poolRequest.member.firstName}</TableCell>
                            <TableCell>{poolRequest.member.lastName}</TableCell>
                            <TableCell>{poolRequest.pool.name}</TableCell>
                            <TableCell>{poolRequest.pool.address}</TableCell>
                            <TableCell>{poolRequest.pool.city}</TableCell>
                            <TableCell>{poolRequest.pool.country}</TableCell>
                            <TableCell>
                                <Box display="flex" flexDirection="row">
                                    <IconButton
                                        color="primary"
                                        aria-label={t('addToCart')}
                                        onClick={() =>
                                            handleAccept(
                                                poolRequest.id,
                                                poolRequest.member.id,
                                                poolRequest.pool.id
                                            )
                                        }
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        aria-label={t('removeFromCart')}
                                        onClick={() => handleDecline(poolRequest.id)}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    </Container>
}
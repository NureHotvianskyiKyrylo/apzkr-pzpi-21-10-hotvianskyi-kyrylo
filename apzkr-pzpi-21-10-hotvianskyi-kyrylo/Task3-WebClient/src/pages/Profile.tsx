import {ReactNode, useEffect, useState} from "react";
import {Alert, Box, Button, Container, MenuItem, Paper, Select, Snackbar, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth.ts";
import {membersService} from "../features/membersService.ts";
import {MemberDto} from "../interfaces/member.ts";
import {poolsService} from "../features/poolsService.ts";
import {PoolDto} from "../interfaces/pool.ts";

function Profile(): ReactNode {
    const { t } = useTranslation();
    const { auth } = useAuth();

    const [member, setMember] = useState<MemberDto>()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [country, setCountry] = useState<string>('')

    const [selectedPoolId, setSelectedPoolId] = useState<number>(0)
    const [pools, setPools] = useState<PoolDto[]>()

    const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveStatus(null);
    };

    const handlePoolSelect = (event) => {
        setSelectedPoolId(event.target.value);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const memberDto = await membersService.getMemberByUser(auth.bearer!);
                setMember(memberDto);
                setFirstName(memberDto.firstName);
                setLastName(memberDto.lastName);

                setName(memberDto.pool?.name || '');
                setDescription(memberDto.pool?.description || '');
                setAddress(memberDto.pool?.address || '');
                setCity(memberDto.pool?.city || '');
                setCountry(memberDto.pool?.country || '');
            } catch (error) {
                console.error('Error fetching member info:', error);
            }
        };

        fetchProfile();
    }, [auth.bearer, member?.identityId]);

    useEffect(() => {
        const fetchPools = async () => {
            try {
                const response = await poolsService.getAllPools(auth.bearer!);
                setPools(response);
            } catch (error) {
                console.error('Error fetching pools:', error);
            }
        };
            fetchPools();
    }, [auth.bearer, selectedPoolId]);

    const leaveFromPool = async () => {
        try {
            await poolsService.leaveFromPool(auth.bearer!);
            setMember((old) => {
                if (!old) {
                    return old;
                }
                old.pool = undefined;
            });
            setSaveStatus('success');
        } catch (error) {
            console.error('Error leaving from pool:', error);
            setSaveStatus('error');
        }
    }

    const saveChanges = async () => {
        try {
            await membersService.updateMember(
                auth.bearer!,
                { firstName, lastName }
            );
            await poolsService.sendRequestToPool(auth.bearer!, selectedPoolId)
            setMember((old) => {
                if (!old) {
                    return old;
                }
                old.lastName = lastName;
                old.firstName = firstName;

            });
            setSaveStatus('success');
        } catch (error) {
            console.error('Error saving company info:', error);
            setSaveStatus('error');
        }
    };

    return <Container>
        <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
            {t('profile')}
        </Typography>

        <Paper elevation={3} style={{ padding: '20px', paddingBottom: '20px' }}>
            <TextField
                fullWidth
                label={t('firstName')}
                variant="outlined"
                margin="normal"
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}/>

            <TextField
                fullWidth
                label={t('lastName')}
                variant="outlined"
                margin="normal"
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}/>

            {member?.pool ? <>
                <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                    {t('pool')}
                </Typography>
                <TextField
                    fullWidth
                    label={t('poolName')}
                    variant="outlined"
                    margin="normal"
                    value={name || ''}
                    disabled={true}/>
                <TextField
                    fullWidth
                    label={t('poolDescription')}
                    variant="outlined"
                    margin="normal"
                    value={description || ''}
                    disabled={true}/>
                <TextField
                    fullWidth
                    label={t('poolAddress')}
                    variant="outlined"
                    margin="normal"
                    value={address || ''}
                    disabled={true}/>
                <TextField
                    fullWidth
                    label={t('poolCity')}
                    variant="outlined"
                    margin="normal"
                    value={city || ''}
                    disabled={true}/>
                <TextField
                    fullWidth
                    label={t('poolCountry')}
                    variant="outlined"
                    margin="normal"
                    value={country || ''}
                    disabled={true}/>
                <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
                    <Button variant="contained" color="error" onClick={leaveFromPool}>
                        {t('leaveFromPool')}
                    </Button>
                </Box>
            </>
            :
            <>
                <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
                    {t('notInPool')}
                </Typography>
                {
                    pools && pools.length > 0 && <Select
                        fullWidth
                        labelId="pool-select-label"
                        id="pool-select"
                        value={selectedPoolId}
                        onChange={handlePoolSelect}
                    >
                        {pools.map((pool) => (
                            <MenuItem key={pool.id} value={pool.id}>
                                {pool.name}
                            </MenuItem>
                        ))}
                    </Select>
                }

            </>}

        </Paper>

        <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={saveChanges}>
                {t('saveChanges')}
            </Button>
            <Snackbar
                open={saveStatus !== null}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity={(saveStatus === 'success' || saveStatus === null) ? 'success' : 'error'}
                    onClose={handleCloseSnackbar}
                >
                    {saveStatus === 'success' || saveStatus === null
                        ? t('changesSavedSuccessfully')
                        : t('errorSavingChanges')}
                </Alert>
            </Snackbar>
        </Box>
    </Container>
}

export default Profile;
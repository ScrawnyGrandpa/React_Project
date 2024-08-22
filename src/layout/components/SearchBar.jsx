import React, { useCallback, useState } from 'react';
import { TextField, IconButton, InputAdornment, Alert, Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../../providers/CustomThemeProvider';
import useCards from '../../hooks/useCards'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { card, getCardById } = useCards();
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = useCallback(async () => {
        if (query) {
            try {
                await getCardById(query);
                setTimeout(() => {
                    if (card) {
                        navigate(`/card-info/${card._id}`);
                    } else {
                        setErrorMsg("Card not found.");
                    }
                }, 700);
            } catch (err) {
                setErrorMsg("An error occurred. Please try again.");
                console.log(err);
            }
        } else {
            setErrorMsg("Search query cannot be empty.");
        }
    }, [query, card, getCardById, navigate]);

    return (
        <>
            <TextField
                sx={{
                    width: '300px',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '5px',
                    '& .MuiInputBase-root': {
                        height: '40px',
                        padding: '0 14px',
                    },
                    '& .MuiInputLabel-root': {
                        lineHeight: '40px',
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '7px',
                        '& fieldset': {
                            borderColor: theme.palette.divider,
                        },
                    },
                }}
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
            <Snackbar
                open={Boolean(errorMsg)}
                autoHideDuration={6000}
                onClose={() => setErrorMsg(null)}
            >
                <Alert onClose={() => setErrorMsg(null)} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SearchBar;
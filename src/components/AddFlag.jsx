import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, CircularProgress, IconButton, InputLabel, MenuItem, Modal, Select, NativeSelect } from '@mui/material';
import { submitFlag } from '../services/APIService';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';
import { CheckBoxOutlined } from '@mui/icons-material';

export default function AddFlag({ pins, setTriggerUpdateFlags }) {
    const screenDimensions = useResizer();
    
    const [showModal, setShowModal] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const styles = {
      button: {
        position: 'absolute',
        bottom: screenDimensions.isMobile ? '120px' : '15px',
        right: screenDimensions.isMobile ? '20px' : '0px',
        width: '100px',
        margin: '0px 12px',
        '& a': {
          color: Theme.light.tertiary,
          textDecoration: 'none'
        }
      },
      submit: {
        width: '100%',
        color: Theme.light.tertiary,
        fontSize: '16px',
        marginTop: '12px'
      },
      modal: {
        position: 'absolute',
        top: screenDimensions.isMobile ? '150px' : '50%',
        left: screenDimensions.isMobile ? '20px' : '50%',
        width: screenDimensions.isMobile ? 250 : 400,
        transform: screenDimensions.isMobile ? 'unset' : 'translate(-50%, -50%)',
        bgcolor: Theme.light.primary,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      },
      modalTitle: {
        
      },
      dropdown: {
        width: '100%',
      },
      loadingParent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      success: {
        marginLeft: '10px',
      }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const success = await submitFlag(selectedSchool);
        setIsError(!success);
        setIsSuccess(success);
        if(success) {
            const TIME_TO_WAIT = 1500;
            setTimeout(() => setShowModal(false), TIME_TO_WAIT);
            setTimeout(() => setIsLoading(false), TIME_TO_WAIT);
            setTimeout(() => setIsSuccess(false), TIME_TO_WAIT);
            setTimeout(setTriggerUpdateFlags(`${selectedSchool.name} ${selectedSchool.flags}`), TIME_TO_WAIT);
        }
    };
  
    return (
    <>
        <IconButton sx={styles.button} onClick={() => setShowModal(true)}>
            <AddCircleOutlineIcon width="32" height="32" color={'error'} />
        </IconButton>
        <Modal
            open={showModal}
            onClose={() =>  setShowModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={styles.modal}>
            {isLoading ? 
                <Box sx={styles.loadingParent}>
                    {isSuccess ?
                    <>
                      <CheckBoxOutlined /> 
                      <p style={styles.success}>Dein Beitrag wurde gespeichert.</p>
                    </>: 
                    <CircularProgress sx={styles.loading} color={'error'} />}
                </Box>
                :
                <>
                    <h2 style={styles.modalTitle} id="parent-modal-title">Fähnchen hinzufügen</h2>
                    <p id="parent-modal-description">
                    Ich möchte eine Grenzüberschreitung oder einen Übergriff melden.
                    </p>
                    <InputLabel id="label">Hochschule</InputLabel>
                    {
                    screenDimensions.isMobile ? 
                    <NativeSelect
                        labelId="label"
                        value={selectedSchool}
                        label="Hochschule"
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        sx={styles.dropdown}
                    >
                    {pins?.hochschulen?.map((pin, index) => (
                        <option key={index} value={pin.name}>{pin.name}</option>
                    ))}
                    </NativeSelect> :
                    <Select
                        labelId="label"
                        value={selectedSchool}
                        label="Hochschule"
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        sx={styles.dropdown}
                    >
                    {pins?.hochschulen?.map((pin, index) => (
                        <MenuItem key={index} value={pin.name}>{pin.name}</MenuItem>
                    ))}
                    </Select>
                    }
                    <Button sx={styles.submit} onClick={handleSubmit} variant={'outlined'} color='error'>
                        Senden
                    </Button>
                </>
            }
            </Box>
            </Modal>
    </>
    );
  }
  
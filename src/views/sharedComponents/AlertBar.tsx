import React from 'react'
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'

interface AlertBarProps {
  message: string
  description?: string
  status?: 'error' | 'info' | 'warning' | 'success' | 'loading'
  onClose: () => void
}

const AlertBar = ({
  message,
  status = 'error',
  description,
  onClose,
}: AlertBarProps): JSX.Element => {
  return (
    <Alert
      status={status}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: '1',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <AlertIcon />
        <Box>
          <AlertTitle fontSize="sm">{message}</AlertTitle>
          <AlertDescription fontSize="xs">{description}</AlertDescription>
        </Box>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  )
}

export default AlertBar

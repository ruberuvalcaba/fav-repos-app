import React from 'react'
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { AlerBarStatus } from '../../types'

interface AlertBarProps {
  isOpen: boolean
  message: string
  description?: string
  status?: AlerBarStatus
  onClose: () => void
}

const AlertBar = ({
  isOpen = false,
  message,
  status = 'error',
  description,
  onClose,
}: AlertBarProps): JSX.Element => {
  if (isOpen) {
    setTimeout(() => {
      onClose()
    }, 4000)
  }
  return isOpen ? (
    <Alert
      status={status}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
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
  ) : null
}

export default AlertBar

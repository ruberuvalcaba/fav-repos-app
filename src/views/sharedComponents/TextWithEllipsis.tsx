import React from 'react'
import { Text } from '@chakra-ui/react'

const TextWithEllipsis = ({
  children,
  width,
}: {
  children: React.ReactNode
  width: string
}): JSX.Element => {
  return (
    <Text
      fontSize="xs"
      style={{
        display: 'block',
        width: width,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      _hover={{
        overflow: 'visible',
      }}
    >
      <>{children}</>
    </Text>
  )
}

export default TextWithEllipsis

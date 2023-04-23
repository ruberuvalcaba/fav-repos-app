import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const StarsCount = ({ stars }: { stars: number | null }): JSX.Element => {
  const starsLabel = stars > 1000 ? `${Number((stars / 1000).toFixed(1))}k` : stars
  return (
    <Box display="flex" alignItems="center">
      <StarIcon w={4} h={4} color="gray.300" mr={1} />
      <Text fontSize="2xs" color="blackAlpha.700">
        {starsLabel}
      </Text>
    </Box>
  )
}

export default StarsCount

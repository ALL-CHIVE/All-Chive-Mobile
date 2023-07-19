import { client } from '../client'

interface DeleteArchivingProps {
  archivingId: number
}

/**
 *
 */
export const deleteArchiving = async ({ archivingId }: DeleteArchivingProps) => {
  const response = await client({
    method: 'DELETE',
    url: `/archivings/${archivingId}`,
  })

  return response
}

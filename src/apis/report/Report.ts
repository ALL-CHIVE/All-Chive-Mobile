import { api } from '@/apis'
import { ReportType } from '@/models/enums/ReportType'

/**
 *
 */
export const postReport = async (
  type: ReportType,
  reason: string,
  reportedType: string,
  id: number
) => {
  const response = await api.post(
    `/reports`,
    {
      reason,
      reportedType,
      id,
    },
    {
      params: {
        type,
      },
    }
  )

  return response
}

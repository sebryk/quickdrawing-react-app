type TruncateOptions = {
   limit?: number
   ellipsis?: string
   trim?: boolean
}

export const truncateText = (
   text: string | null | undefined,
   { limit = 12, ellipsis = '...', trim = true }: TruncateOptions = {},
) => {
   if (!text) return ''

   const normalizedText = trim ? text.trim() : text
   if (normalizedText.length <= limit) {
      return normalizedText
   }

   const sliceIndex = Math.max(limit - ellipsis.length, 0)
   const truncated = normalizedText.slice(0, sliceIndex)
   return `${trim ? truncated.trimEnd() : truncated}${ellipsis}`
}

import { ClientsService } from '@/store/api/index.js'
import router from '@/router'

export function isUnique (value) {
  const currentClient = router.history.current.params.id || null
  return ClientsService
    .uniqueClientName(value, currentClient)
    .then(unique => {
      if (unique) {
        return {
          valid: true
        }
      }
      return {
        valid: false,
        data: {
          message: 'This client already exists.'
        }
      }
    })
}

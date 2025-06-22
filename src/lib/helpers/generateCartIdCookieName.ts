import { SELLER_HANDLE } from "../config"

export default function generateCartIdCookieName() {
  if (SELLER_HANDLE) {
    return `_medusa_cart_id_${SELLER_HANDLE}`
  }
  return "_medusa_cart_id"
}

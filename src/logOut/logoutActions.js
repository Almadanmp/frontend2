export function logout(e) {
  e.preventDefault()
  localStorage.removeItem("loginToken")
  localStorage.removeItem("user")
  localStorage.removeItem("userRole")
}

export async function saveReferralCookie() {
  const urlParams = new URLSearchParams(window.location.search)
  const reffered_by = urlParams.get('referred_by')

  if (reffered_by) {
    await cookieStore.set('referred_by', reffered_by)
  }
}

export async function checkReferral(user, saveUser) {
  if (!user.referred_by) {
    const referred_by = await cookieStore.get('referred_by')
    if (referred_by) {
      user.referred_by = referred_by.value
      saveUser(user, user.uid).then(() => {
        cookieStore.delete('referred_by')
      })
    }
  }
}

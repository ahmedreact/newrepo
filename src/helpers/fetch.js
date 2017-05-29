export const post = async ({ url, body, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    console.log(data)
    dispatch({ type: success, data })
  } catch (e) {
    const data = { sucess: false, failure: true }
    console.log(data)
    dispatch({ type: failure, data })
  }
}

export const get = async ({ url, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
    dispatch({ type: success, data })
  } catch (e) {
    const data = { sucess: false, failure: true }
    console.log(data)
    dispatch({ type: failure, data })
  }
}

import api from '@/utils/axios'

// 회원가입
const registerUser = async (userData) => {
  try {
    const check = await api.get('/Auth', {
      params: { userId: userData.userId },
    })

    if (check.data.length > 0) {
      throw new Error('이미 사용 중인 아이디입니다.')
    }

    const response = await api.post('/Auth', userData)
    // console.log('회원가입 성공')
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message)
    throw error
  }
}

// 로그인
const loginUser = async (credentials) => {
  try {
    const { userId, password } = credentials
    const response = await api.get('/Auth', {
      params: {
        userId,
        password,
      },
    })
    if (response.data.length > 0) {
      // console.log('로그인 성공')
      return response.data[0]
    } else {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
  } catch (err) {
    console.error('로그인 실패:', err.message)
    throw err
  }
}

// 비밀번호 찾기
const findPassword = async ({ name, userId }) => {
  try {
    const response = await api.get('/Auth', {
      params: { name, userId },
    })
    if (response.data.length > 0) {
      // 임시로 비밀번호를 바로 반환
      return response.data[0].password
    } else {
      throw new Error('일치하는 계정이 없습니다.')
    }
  } catch (error) {
    console.error('비밀번호 찾기 실패:', error.response?.data || error.message)
    throw error
  }
}

// 회원정보 수정
const changeUserInfo = async (userInfo) => {
  try {
    const response = await api.put(`/Auth/${userInfo.id}`, userInfo)
    // console.log('회원정보 수정 성공')
    return response.data
  } catch (error) {
    console.error('회원정보 수정 실패:', error.response?.data || error.message)
    throw error
  }
}

// 회원탈퇴
const deleteUser = async (id) => {
  try {
    await api.delete(`/Auth/${id}`)
    // console.log('회원탈퇴 성공')
    return true
  } catch (error) {
    console.error('회원탈퇴 실패:', error.response?.data || error.message)
    throw error
  }
}

export { registerUser, loginUser, findPassword, changeUserInfo, deleteUser }

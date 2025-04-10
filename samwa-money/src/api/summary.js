import api from '@/utils/axios'

// blance 객체 리스트로 모두 가져오기
const getBalance = async () => {
  try {
    const response = await api.get('/Balance')

    return response.data
  } catch (error) {
    console.error('Balance 가져오기 실패', error.response?.data || error.message)
  }
}

// 카테고리를 가져오는 함수
const getCategory = async () => {
  try {
    const response = await api.get('/Category')
    return response.data
  } catch (error) {
    console.error('Category 가져오기 실패', error.response?.data || error.message)
  }
}

// ✅ 객체로 묶어서 export
export default {
  getCategory,
  getBalance,
}

//

//
// const registerUser = async (userData) => {
//   try {
//     const response = await axios.post('/Auth', userData)
//     console.log('회원가입 성공:', response.data)
//     return response.data
//   } catch (error) {
//     console.error('회원가입 실패:', error.response?.data || error.message)
//     throw error
//   }
// }

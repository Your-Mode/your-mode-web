export const getBodyTypeWithId = (id: number) => {
  if (id === 1) {
    return "스트레이트"
  } else if (id === 2) {
    return "웨이브"
  } else if (id === 3) {
    return "내추럴"
  } else {
    return "선택안함"
  }
}

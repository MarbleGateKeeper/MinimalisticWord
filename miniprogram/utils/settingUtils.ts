// 背单词功能配置
export interface WordSetting{
  // 单词集大小
  wordSetSize: number,
  // 干扰项数量
  distractorSize: number
}

export interface ColorScheme{
  backgroundColor: string,
  textColor: string,
  emphTextColor: string,
  componentColor: string
}

export const standardColorScheme: ColorScheme = {
  backgroundColor: "#DFF6FF",
  textColor: "#06283D",
  emphTextColor: "#1363DF",
  componentColor: "#47B5FF"
}


export const nightColorScheme: ColorScheme = {
  backgroundColor: "#181818",
  textColor: "#EEEEEE",
  emphTextColor: "#787A91",
  componentColor: "#141E61"
}
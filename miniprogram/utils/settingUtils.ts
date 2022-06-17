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
  ComponentColor: string
}

export const standardColorScheme: ColorScheme = {
  backgroundColor: "#DFF6FF",
  textColor: "#06283D",
  emphTextColor: "#1363DF",
  ComponentColor: "#47B5FF"
}


export const nightColorScheme: ColorScheme = {
  backgroundColor: "#0F044C",
  textColor: "#EEEEEE",
  emphTextColor: "#787A91",
  ComponentColor: "#141E61"
}
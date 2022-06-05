export const wordBookMap = [
  {
    "item":"cet4",
    "name":"四级单词"
  },
  {
    "item":"cet6",
    "name":"六级单词"
  },
  {
    "item":"tem4",
    "name":"专四单词"
  },
  {
    "item":"tem8",
    "name":"专八单词"
  },
  {
    "item":"npee",
    "name":"考研单词"
  },
  {
    "item":"tofel",
    "name":"托福单词"
  },
  {
    "item":"oelts",
    "name":"雅思单词"
  },
  {
    "item":"sat",
    "name":"SAT单词"
  },
  {
    "item":"gre",
    "name":"GRE单词"
  },
  {
    "item":"gmat",
    "name":"GMAT单词"
  }
]

export interface WordData {
  content: string,
  meaning: string
}

// 带有固定数量的错误解释的单词数据
export interface ShuffledWordData {
  content: string,
  anwserCollection: string[],
  correctAnswerPosition: number
}

// 单词集合
// 你总不能一次性把所有单词都塞进 globalData 里面吧？
export class WordDataSet {
  data: WordData[];
  constructor(readIn: Array<WordData>) {
    this.data = readIn;
  }

  /**
   * Roll 一个带有固定数量的随机错误解释的单词数据出来
   * @param serial 该单词在单词集里面的位置
   * @param size 包含答案词条的数量，包括正确答案
   */
  public roll(serial: number, size: number): ShuffledWordData {
    let anwsers: string[] = [this.data[serial].meaning]
    let a = 1;
    while (a < size) {
      const randomElement: WordData = this.data[Math.floor(Math.random() * this.data.length)];
      if (this.data.indexOf(randomElement) != serial) {
        if (anwsers.indexOf(randomElement.meaning) == -1) {
          anwsers.push(randomElement.meaning);
          a++;
        }
      }
    }
    anwsers = shuffleAnswer(anwsers)
    return {
      content: this.data[serial].content,
      anwserCollection: anwsers,
      correctAnswerPosition: anwsers.indexOf(this.data[serial]["meaning"])
    };
  }

}

/**
 * 创建指定大小的随机单词集，返回一个 Promise<WordDataSet>
 * @param type "cet4":四级单词,"cet6":六级单词,"tem4": 专四单词,"tem8": 专八单词, "npee":考研单词,"tofel":托福单词,"oelts":雅思单词,"sat":SAT单词,"gre":GRE单词,"gmat":GMAT单词
 * @param size 单词集大小
 */
export async function createWordDataSet(type: string, size: number): Promise<WordDataSet> {
  return new Promise((resolve, reject) => {
    let datas: Array<WordData> = [];
    // 从云函数获取数据
    let temp = getWordSetFromCloud(type, size);
    let a = 0;
    let result = undefined;
    temp.then(res => {
      result = (res as AnyObject).wordset;
      if (result == undefined) {
        reject(new Error('云端获取词库失败'));
      } else {
        while (a < size) {
          const randomElement = result[Math.floor(Math.random() * (result as WordData[]).length)];
          if (datas.indexOf(randomElement) == -1) {
            a = datas.push(randomElement)
          }
        }
        resolve(new WordDataSet(datas));
      }
    })
  })
}

async function getWordSetFromCloud(type: string, size: number) {
  const data = await wx.cloud.callFunction({
    name: "getWordSet",
    data: {
      "type": type,
      "size": size
    },
  });
  return data.result;
}


function shuffleAnswer(array: Array<string>): Array<string> {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}